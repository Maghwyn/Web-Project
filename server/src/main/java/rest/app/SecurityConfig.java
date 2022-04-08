package rest.app;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    public void configure(HttpSecurity http) throws Exception {
        http.antMatcher("/oath")
            .authorizeRequests()
                .antMatchers("/auth").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/auth")
                .permitAll()
                .and()
            .logout()
                .permitAll();
    }
}
