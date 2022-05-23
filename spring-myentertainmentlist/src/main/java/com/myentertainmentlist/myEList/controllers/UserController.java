package com.myentertainmentlist.myEList.controllers;

import com.myentertainmentlist.myEList.enums.MediaListType;
import com.myentertainmentlist.myEList.enums.UserRole;
import com.myentertainmentlist.myEList.models.Role;
import com.myentertainmentlist.myEList.models.User;
import com.myentertainmentlist.myEList.models.medialist.MediaList;
import com.myentertainmentlist.myEList.payloads.requests.LoginRequest;
import com.myentertainmentlist.myEList.payloads.requests.RegisterRequest;
import com.myentertainmentlist.myEList.payloads.responses.JwtResponse;
import com.myentertainmentlist.myEList.payloads.responses.MessageResponse;
import com.myentertainmentlist.myEList.repositories.RoleRepository;
import com.myentertainmentlist.myEList.repositories.UserRepository;
import com.myentertainmentlist.myEList.repositories.medialist.MediaListRepository;
import com.myentertainmentlist.myEList.security.authentication.*;
import com.myentertainmentlist.myEList.security.jwt.JwtUtils;
import com.myentertainmentlist.myEList.services.UserDetailsImpl;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.common.exceptions.InvalidTokenException;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.mail.MessagingException;
import java.util.*;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MediaListRepository mediaListRepository;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private DefaultEmailService defaultEmailService;

    @Autowired
    private DefaultSecureTokenService defaultSecureTokenService;

    @Autowired
    private SecureTokenRepository secureTokenRepository;

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    private ThreadPoolExecutor executor = new ThreadPoolExecutor(10, 10, 10, TimeUnit.SECONDS, new LinkedBlockingQueue<Runnable>());

    private static final String REDIRECT_LOGIN = "redirect:/login";

    @GetMapping("/authenticate")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> authenticate() {
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(@RequestParam(required = false) String filter) {
        try {
            List<User> users = new ArrayList<User>();

            if (filter == null) {
                userRepository.findAll().forEach(users::add);
            } else {
                userRepository.findByUsernameContaining(filter).forEach(users::add);
            }

            if (users.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(users, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") long id) {
        Optional<User> userData = userRepository.findById(id);

        if (userData.isPresent()) {
            return new ResponseEntity<>(userData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/users/username/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable("username") String username) {
        try {
            if (!userRepository.existsByUsername(username)) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/email/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable("email") String email) {
        try {
            if (!userRepository.existsByEmail(email)) {
                return new ResponseEntity<>(null, HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(null, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/users/register/verify_token")
    public String verifyUser(@RequestParam(required = false) String token, final Model model, RedirectAttributes redirAttr) {
        if (StringUtils.isEmpty(token)) {
            redirAttr.addFlashAttribute("tokenError", "Token is Missing!");
            return "Token is Missing!";
        }
        try {
            this.verifyUser(token);
        } catch (InvalidTokenException e) {
            redirAttr.addFlashAttribute("tokenError", "Token is Invalid!");
            return "Token is Invalid!";
        }
        redirAttr.addFlashAttribute("verifiedAccountMsg", "Token Verified!. You can now login into your account!");
        return "Account Validated. You can now log in to your account.";
    }

    @PostMapping("/users/register")
    public ResponseEntity<?> createUser(@RequestBody RegisterRequest registerRequest) {
        try {
            System.out.println("IN");
            if (userRepository.existsByEmail(registerRequest.getEmail())) {
                return new ResponseEntity<>(new MessageResponse("Email is already taken!"), HttpStatus.BAD_REQUEST);
            }

            System.out.println("After Email");


            if (userRepository.existsByUsername(registerRequest.getUsername())) {
                return new ResponseEntity<>(new MessageResponse("Username is already taken!"), HttpStatus.BAD_REQUEST);
            }

            System.out.println("After Username");

            User _user = new User(registerRequest.getFirstName(), registerRequest.getLastName(), registerRequest.getUsername(), registerRequest.getEmail(), passwordEncoder.encode(registerRequest.getPassword()));

            System.out.println("Created User");

            Set<Role> roles = new HashSet<>();

            Role userRole = roleRepository.findByName(UserRole.ROLE_USER)
                    .orElseThrow(() -> new RuntimeException("Role not Found!"));

            System.out.println("Gotten Role");

            roles.add(userRole);

            _user.setRoles(roles);

            userRepository.save(_user);

            System.out.println("User Repository");

            MediaList mediaList = new MediaList("All", "", true, true, MediaListType.MEDIA_ALL);
            mediaList.setUser(_user);

            System.out.println("Created Medialist");

            String posterName = "default_poster.jpg";
            mediaList.setPosterName(posterName);
            mediaListRepository.save(mediaList);

            System.out.println("Saved MediaList");

            executor.execute(new Runnable() {
                public void run() {
                    sendRegistrationConfirmationEmail(_user);
                }
            });

            return new ResponseEntity<>(_user, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/users/login")
    public ResponseEntity<?> verifyLogin(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        List<MediaList> mediaLists = mediaListRepository.findMedialistsByUser_Id(userDetails.getId());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                roles,
                mediaLists));
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable("id") long id) {
        try {
            userRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public void sendRegistrationConfirmationEmail(User user) {
        SecureToken secureToken = defaultSecureTokenService.createSecureToken();
        secureToken.setUser(user);
        secureTokenRepository.save(secureToken);
        AccountVerificationEmailContext emailContext = new AccountVerificationEmailContext();
        emailContext.init(user);
        emailContext.setToken(secureToken.getToken());
        emailContext.buildVerificationUrl("http://localhost:8090", secureToken.getToken());
        emailContext.setTemplateLocation("EmailAuthentication.html");
        try {
            defaultEmailService.sendMail(emailContext);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public boolean verifyUser(String token) throws InvalidTokenException {
        SecureToken secureToken = defaultSecureTokenService.findByToken(token);
        if (Objects.isNull(secureToken) || !StringUtils.equals(token, secureToken.getToken()) || secureToken.isExpired()) {
            throw new InvalidTokenException("Token is not valid");
        }
        User user = userRepository.getOne(secureToken.getUser().getId());
        if (Objects.isNull(user)) {
            return false;
        }
        user.setAccountVerified(true);
        userRepository.save(user); // let’s same user details

        // we don’t need invalid password now
        defaultSecureTokenService.removeToken(secureToken);
        return true;
    }
}