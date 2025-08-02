package server.Services;
import server.Io.ProfileRequest;
import server.Io.ProfileResponse;

public interface ProfileServices {
    
  ProfileResponse  CreateProfile(ProfileRequest request);

  ProfileResponse getProfile(String email);

  void sendResetOtp(String email);

  void resetPassword(String email, String opt, String newPassword);

  void sendOtp(String email);

  void verifyOtp(String email, String otp);
  
  //  void setProfile(MultipartFile image, String userId, String username, String bio);
    void setProfile(String userId, String username, String bio);

    void deleteProfileById(String userId);
}
