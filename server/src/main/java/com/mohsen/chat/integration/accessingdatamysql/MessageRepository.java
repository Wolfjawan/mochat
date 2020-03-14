package com.mohsen.chat.integration.accessingdatamysql;

import com.mohsen.chat.domain.Message;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MessageRepository extends CrudRepository<Message, Integer> {
    List<Message> findByFromIdAndToId( int fromId, int toId);
}
