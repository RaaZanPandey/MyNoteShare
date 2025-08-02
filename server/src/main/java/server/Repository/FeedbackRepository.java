package server.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import server.Entity.FeedbackEntity;

public interface FeedbackRepository extends JpaRepository<FeedbackEntity, Long>{

    
} 
