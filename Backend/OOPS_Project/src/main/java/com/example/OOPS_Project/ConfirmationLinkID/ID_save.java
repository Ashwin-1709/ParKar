package com.example.OOPS_Project.ConfirmationLinkID;


import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@AllArgsConstructor
public class ID_save {

    private final ID_Storage id_storage;

    public void saveID(Auth_ID id)
    {
        id_storage.save(id);
    }
    public Optional<Auth_ID> getId(String id)
    {
        return id_storage.findByAuthtoken(id);
    }

    public int setAuth_time(String s)
    {
        return id_storage.updateAuth_time(s , LocalDateTime.now());
    }
}
