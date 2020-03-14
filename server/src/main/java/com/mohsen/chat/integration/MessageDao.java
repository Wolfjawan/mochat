package com.mohsen.chat.integration;

import com.mohsen.chat.domain.Message;
import com.mohsen.chat.integration.accessingdatamysql.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class MessageDao {

    @Autowired
    private MessageRepository messageRepository;

    public Message save(Message message) {
        return messageRepository.save(message);
    }

    public List<Message> findByFromIdToId( int fromId, int toId) {
      return (List<Message>) messageRepository.findByFromIdAndToId(fromId, toId);
    }
}
