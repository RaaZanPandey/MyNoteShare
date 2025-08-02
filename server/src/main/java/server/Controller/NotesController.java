package server.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import server.Entity.NotesEntity;
import server.Repository.NotesRepository;
import server.Services.NoteServices;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

@RestController
@Controller
@RequiredArgsConstructor
@RequestMapping("/notes")
public class NotesController {

    private final NoteServices noteServices;
    private final NotesRepository notesRepository;

    @PostMapping("/postNote")
    public ResponseEntity<?> CreateNote(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam("createdBy") String createdBy) throws Exception {
        noteServices.postNote(file, title, description, createdBy);
        return ResponseEntity.ok("File created succesfully");
    }

    @GetMapping("/getallNote")
    public ResponseEntity<?> getAllNotes() {
        return ResponseEntity.ok(noteServices.getAllnotes());
    }

    @GetMapping("/readNote/{id}")
    public ResponseEntity<byte[]> ReadNoteFile(@PathVariable String id) {
        try {
            NotesEntity note = noteServices.findById(id)
                    .orElseThrow(() -> new RuntimeException("Note not fould"));

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(note.getFileType())) // e.g., application/pdf
                    .header("Content-Disposition", "inline; filename=\"" + note.getFileName() + "\"")
                    .body(note.getFileContent()); // Actual binary file content
        } catch (Exception e) {
            throw new RuntimeException("Somthing went worng");
        }

    }

    @GetMapping("/download/{id}")
    public ResponseEntity<?> downLoadNotes(@PathVariable String id) {
        try {
            NotesEntity notetoDonwload = noteServices.findById(id)
                    .orElseThrow(() -> new RuntimeException("Note not found"));

            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(notetoDonwload.getFileType()))
                    .header("Content-Disposition", "attachment; filename=\"" + notetoDonwload.getFileName() + "\"")
                    .body(notetoDonwload.getFileContent());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Something went wrong!");
        }
    }

    @GetMapping("findnotesbyuser/{id}")
    public ResponseEntity<?> findNotesByCrater(@PathVariable String id) {
        try {
           return ResponseEntity.ok(noteServices.getNotesByUser(id));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Unable to find notes");
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable String id) {
        try {
            noteServices.deleteNote(id);
            return ResponseEntity.status(HttpStatus.OK).body("Note deleted succesfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Unable to delete the note");
        }
    }

}
