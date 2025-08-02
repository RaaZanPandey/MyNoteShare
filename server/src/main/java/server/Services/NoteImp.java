package server.Services;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import lombok.RequiredArgsConstructor;
import server.Entity.NotesEntity;
import server.Io.NoteResponse;
import server.Repository.NotesRepository;
import server.Repository.UserRepository;

@RequiredArgsConstructor
@Service
public class NoteImp implements NoteServices {

    private final NotesRepository notesRepository;
    private final UserRepository userRepository;

    @Override
    public void postNote(MultipartFile file, String title, String description, String createdBy) {
        try {
            NotesEntity newNote = convertToNoteEntity(file, title, description, createdBy);
            notesRepository.save(newNote);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read file data: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Unable to post note: " + e.getMessage(), e);
        }
    }

    private NotesEntity convertToNoteEntity(MultipartFile file, String title, String description, String createdBy)
            throws IOException {
        return NotesEntity.builder()
                .note_id(UUID.randomUUID().toString())
                .title(title)
                .description(description)
                .fileName(file.getOriginalFilename())
                .fileType(file.getContentType())
                .fileContent(file.getBytes())
                .createdAt(LocalDate.now())
                .createdBy(createdBy)
                .build();
    }

    @Override
    public List<NoteResponse> getAllnotes() {
        List<NotesEntity> Notes = notesRepository.findAll();
        return Notes.stream()
                .map(notes -> NoteResponse.builder()
                        .id(notes.getNote_id())
                        .title(notes.getTitle())
                        .description(notes.getDescription())
                        .fileType(notes.getFileType().split("/")[1])
                        .createdBy(userRepository.findByUserid(notes.getCreatedBy()).getName())
                        .createdAt(notes.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

    }

    @Override
    public Optional<NotesEntity> findById(String id) {
        return notesRepository.findById(id);
    }

    @Override
    public void deleteNote(String id) {
        notesRepository.deleteById(id);
    }

    @Override
    @Transactional
    public List<NoteResponse> getNotesByUser(String id) {
        List<NotesEntity> notes = notesRepository.findByCreatedBy(id);
        return notes.stream()
                .map((note) -> NoteResponse.builder()
                        .id(note.getNote_id())
                        .createdBy(userRepository.findByUserid(id).getName())
                        .title(note.getTitle())
                        .description(note.getDescription())
                        .fileType(note.getFileType())
                        .createdAt(note.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

    }

}
