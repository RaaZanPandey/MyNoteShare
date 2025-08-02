package server.Controller;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.CurrentSecurityContext;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import server.Io.FeedbackRequest;
import server.Io.ProfileRequest;
import server.Io.ProfileResponse;
import server.Io.UpdateRequest;
import server.Services.EmailService;
import server.Services.ProfileServices;
import server.Services.FeedbackService;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileServices profileServices;

    private final EmailService emailService;

    private final FeedbackService feedbackservice;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public ProfileResponse register(@Valid @RequestBody ProfileRequest request) {
        ProfileResponse response = profileServices.CreateProfile(request);
        emailService.sentWelcomeEmail(response.getEmail(), response.getName());
        return response;
    }

    @GetMapping("/profile")
    public ProfileResponse getProfile(@CurrentSecurityContext(expression = "authentication?.name") String email) {
        return profileServices.getProfile(email);
    }


    @PutMapping("/edit_profile/{userid}")
    public ResponseEntity<?> EditProFile(@PathVariable String userid, @RequestBody UpdateRequest updateRequest){
        try {
            profileServices.setProfile(userid, updateRequest.getName(),updateRequest.getBio());
            return ResponseEntity.ok("Profile updated succesfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e);
        }
    }


    @PostMapping("/feedback")
    public ResponseEntity<?> AddfeedBack(@RequestBody FeedbackRequest feedback) {
        try {
            feedbackservice.addfeedBack(feedback);
            return ResponseEntity.ok("Feedback submited succesfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e);
        }
    }

@DeleteMapping("deleteuser/{id}")
  public ResponseEntity<?> DeleteUser(@PathVariable String id){
    System.out.println(id);
    try {
        profileServices.deleteProfileById(id);
        return ResponseEntity.ok("User Deleted succesfully");
    } catch (Exception e) {
       return ResponseEntity.status(HttpStatus.CONFLICT).body("Unable to delete user "); 
    }
  }

}
