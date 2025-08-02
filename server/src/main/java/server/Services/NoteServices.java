package server.Services;

import java.util.*;
import org.springframework.web.multipart.MultipartFile;

import server.Entity.NotesEntity;
import server.Io.NoteResponse;



public interface NoteServices {
   public void postNote(MultipartFile file, String title, String description, String createdBy) throws Exception;

   public List<NoteResponse> getAllnotes();

 public Optional<NotesEntity> findById(String id);

 public void deleteNote(String id);

    public List<NoteResponse> getNotesByUser(String id);
}
