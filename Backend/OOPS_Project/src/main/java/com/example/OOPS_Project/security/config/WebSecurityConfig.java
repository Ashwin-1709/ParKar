package com.example.OOPS_Project.security.config;

import com.example.OOPS_Project.UserApp.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {


    private final AppUserService appUserService;

    private final BCryptPasswordEncoder passhasher;
    @Override
    protected void configure(HttpSecurity http) throws Exception {
      http.authorizeRequests().antMatchers("/").permitAll().anyRequest().permitAll();

      http.cors().and().csrf().disable();
//       http
//               .csrf().disable()
//               .authorizeRequests()
//               .antMatchers("/register/**")
//              .permitAll().anyRequest()
//                .authenticated().and().formLogin();
//        http
//                .csrf().disable()
//                .authorizeRequests()
//                .antMatchers("/register/**").permitAll()
//                .antMatchers("/login*").permitAll()
//                .anyRequest().authenticated().and().formLogin();

//        http
//                .antMatcher("/**").authorizeRequests()
//                .antMatchers("sign_in/google/**").permitAll()
//                .antMatchers("/sign_in").permitAll().antMatchers("/register/**").permitAll()
//                .anyRequest().authenticated()
//                .and().oauth2Login();

    }

//    @Override
//    public void configure(WebSecurity web) throws Exception
//    {
//        web.ignoring().antMatchers("/register/**").antMatchers("/sign_in");
//    }



    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(daoAuthenticationProvider());
    }


    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider()
    {
        DaoAuthenticationProvider prov = new DaoAuthenticationProvider();
        prov.setPasswordEncoder(passhasher);
        prov.setUserDetailsService(appUserService);
        return prov;
    }
}