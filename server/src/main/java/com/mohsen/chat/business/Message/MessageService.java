package com.mohsen.chat.business.Message;

import com.mohsen.chat.domain.Message;

import java.util.List;

public interface MessageService {
    public Message saveMessage(Message message);
    public List<Message> getConversation( int fromId, int toId );
}
