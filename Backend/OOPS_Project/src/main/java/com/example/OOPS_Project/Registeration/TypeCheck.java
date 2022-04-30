package com.example.OOPS_Project.Registeration;

import org.springframework.stereotype.Service;

import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class TypeCheck implements Predicate<String> {
    @Override
    public boolean test(String s) {
        String email_regex = "^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$";
        Pattern checker = Pattern.compile(email_regex , Pattern.CASE_INSENSITIVE);
        Matcher valid = checker.matcher(s);
        return valid.find();
    }
}
