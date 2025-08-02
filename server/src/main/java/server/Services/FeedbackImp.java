package server.Services;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import server.Entity.FeedbackEntity;
import server.Io.FeedbackRequest;
import server.Repository.FeedbackRepository;
import server.Repository.UserRepository;

@Service
@RequiredArgsConstructor

public class FeedbackImp implements FeedbackService{

private final FeedbackRepository feedbackRepository;
private final UserRepository userRepository;

    @Override
    public void addfeedBack(FeedbackRequest feedback) {
      FeedbackEntity feedBack = convertToFeedBackEntity(feedback);
     feedbackRepository.save(feedBack);
    }

    private FeedbackEntity convertToFeedBackEntity(FeedbackRequest feedback) {
        return FeedbackEntity.builder()
                             .username(userRepository.findByUserid(feedback.getUserId()).getName())
                             .subject(feedback.getSubject())
                             .type(feedback.getType())
                             .description(feedback.getDescription())
                             .build();
    }
    
}
