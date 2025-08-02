package server.Repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import server.Entity.NotesEntity;

public interface NotesRepository extends JpaRepository<NotesEntity, String>{
    
    Optional<NotesEntity> findById(String id);

    List<NotesEntity> findByCreatedBy(String id);
}
