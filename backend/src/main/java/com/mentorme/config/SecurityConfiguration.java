package com.mentorme.config;

import com.mentorme.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {
    @Autowired
    CustomUserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf // Configure CSRF protection (optional)
                        .ignoringRequestMatchers("/login")) // Exclude login from CSRF protection
                        .authorizeHttpRequests((authz) -> authz
                                .requestMatchers("/login", "/signup").permitAll()
                                .anyRequest().authenticated())
                .formLogin(formLogin -> formLogin  // Use lambda for formLogin configuration
                .loginPage("/login") // Use a custom login page (optional)
                .usernameParameter("username") // Customize username form parameter (optional)
                .passwordParameter("password") // Customize password form parameter (optional)
                .successHandler(loginSuccessHandler()) // Handle successful login (optional)
                .failureHandler(loginFailureHandler())) // Handle failed login (optional))
                .logout(logout -> logout  // Use lambda for logout configuration
                        .logoutUrl("/logout") // Customize logout URL (optional)
                        .logoutSuccessHandler(logoutSuccessHandler()));
        return http.build();
    }

    // Implement custom handlers for login success, failure, and logout (optional)
    private AuthenticationSuccessHandler loginSuccessHandler() {
        // Handle successful login logic here (e.g., redirect to home page)
        return (request, response, authentication) -> {
            response.sendRedirect("/home");
        };
    }

    private AuthenticationFailureHandler loginFailureHandler() {
        // Handle failed login logic here (e.g., redirect to login with error message)
        return (request, response, exception) -> {
            response.sendRedirect("/login?error");
        };
    }

    private LogoutSuccessHandler logoutSuccessHandler() {
        // Handle successful logout logic here (e.g., redirect to login page)
        return (request, response, authentication) -> {
            response.sendRedirect("/login");
        };
    }


    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
