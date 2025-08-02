package server.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import server.Entity.UserEntity;
import server.Io.ProfileRequest;
import server.Io.ProfileResponse;
import server.Repository.UserRepository;
import java.util.*;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class ProfileImp implements ProfileServices {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    @Transactional
    @Override
    public ProfileResponse CreateProfile(ProfileRequest request) {
        UserEntity newProfile = convertToUserEntity(request);
        if (!userRepository.existsByEmail(newProfile.getEmail())) {
            newProfile = userRepository.save(newProfile);
            return convertToProfileResponse(newProfile);
        }
        throw new ResponseStatusException(HttpStatus.CONFLICT, "User alreadty exist with provided email");
    }

 
    private ProfileResponse convertToProfileResponse(UserEntity newProfile) {
        return ProfileResponse.builder()
                .name(newProfile.getName())
                .email(newProfile.getEmail())
                .userId(newProfile.getUserid())
                .isAccountVerified(newProfile.getIsAccountVerified())
                .bio(newProfile.getBio())
                // .profileImg(newProfile.getProfileImg())
                .build();
    }

    private UserEntity convertToUserEntity(ProfileRequest request) {
        return UserEntity.builder()
                .email(request.getEmail())
                .userid(UUID.randomUUID().toString())
                .name(request.getName())
                .password(passwordEncoder.encode(request.getPassword()))
                .isAccountVerified(false)
                .resetOtpExpireAt(0L)
                .varifyOtp(null)
                .varifyOtpExpireAt(0L)
                .resetOtp(null)
                .bio(null)
                // .profileImg(null)
                .build();
    }

    @Transactional
    @Override
    public ProfileResponse getProfile(String email) {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found:  " + email));

        return convertToProfileResponse(existingUser);
    }

    @Override
    public void sendResetOtp(String email) {
        UserEntity existUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not fould with this email:  " + email));

        // Generate 6 digits OPT
        String opt = String.valueOf(ThreadLocalRandom.current().nextInt(100000, 1000000));

        // Calculete expire time (current time + 15 minutes in millisecond)
        long expireTime = System.currentTimeMillis() + (15 * 60 * 1000);

        // Update the profile/user
        existUser.setResetOtp(opt);
        existUser.setResetOtpExpireAt(expireTime);

        // save into the database
        userRepository.save(existUser);

        try {
            emailService.sentResetOtpEmail(existUser.getEmail(), opt);
        } catch (Exception e) {
            throw new RuntimeException("Unable to send email");
        }
    }

    @Override
    public void resetPassword(String email, String opt, String newPassword) {
        UserEntity existUser = userRepository.findByEmail(email)
                .orElseThrow(
                        () -> new UsernameNotFoundException("User not found assoicated with this email  " + email));

        if (existUser.getResetOtp() == null || !existUser.getResetOtp().equals(opt)) {
            throw new RuntimeException("Invalid OTP");
        }
        if (existUser.getResetOtpExpireAt() < System.currentTimeMillis()) {
            throw new RuntimeException("OPT Expaired");
        }

        existUser.setPassword(passwordEncoder.encode(newPassword));
        existUser.setResetOtp(null);
        existUser.setVarifyOtpExpireAt(0L);
        userRepository.save(existUser);
    }

    @Override
    public void sendOtp(String email) {
        UserEntity existingUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found  " + email));

        if (existingUser.getIsAccountVerified() != null && existingUser.getIsAccountVerified()) {
            return;
        }
        // Generate 6 digits OTP
        String opt = String.valueOf(ThreadLocalRandom.current().nextInt(100000, 1000000));

        // Calculete expire time (current time + 24 hours in millisecond)
        long expireTime = System.currentTimeMillis() + (24 * 60 * 60 * 1000);

        // Updare the user entity
        existingUser.setVarifyOtp(opt);
        existingUser.setVarifyOtpExpireAt(expireTime);
        userRepository.save(existingUser);

        try {
            emailService.sendOtpMail(existingUser.getEmail(), opt);
        } catch (Exception e) {
            throw new RuntimeException("Unable to send email");
        }

    }

    @Override
    public void verifyOtp(String email, String otp) {
        UserEntity existUser = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with this email  " + email));

        if (existUser.getVarifyOtp() == null || !existUser.getVarifyOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        if (existUser.getVarifyOtpExpireAt() < System.currentTimeMillis()) {
            throw new RuntimeException("OTP Expaired");
        }
        existUser.setIsAccountVerified(true);
        existUser.setVarifyOtp(null);
        existUser.setVarifyOtpExpireAt(0L);

        userRepository.save(existUser);
    }

    @Override
    @Transactional
    public void setProfile(String userId, String username, String bio) {
        UserEntity user = userRepository.findByUserid(userId);

        if (user == null) {
            throw new RuntimeException("User not found with ID: " + userId);
        }
        try {
            user.setBio(bio);
            user.setName(username);
            // user.setProfileImg(image.getBytes());
            userRepository.save(user);
        } catch (Exception e) {
            e.getStackTrace();
            throw new RuntimeException("Unable to edit user data", e);

        }

    }


    @Override
    public void deleteProfileById(String userId) {
      userRepository.delete(userRepository.findByUserid(userId));
    }


    

}
