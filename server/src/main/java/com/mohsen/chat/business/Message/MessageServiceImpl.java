package com.mohsen.chat.business.Message;


import com.mohsen.chat.domain.Message;
import com.mohsen.chat.integration.MessageDao;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class MessageServiceImpl implements MessageService {

    @Autowired
    private MessageDao messageDao;

    @Override
    public Message saveMessage( Message message ) {
        message.setCreatedAt( LocalDateTime.now() );
        return messageDao.save( message );
    }

    @Override
    public List<Message> getConversation( int fromId, int toId ) {
        List<Message> messages = (List<Message>) messageDao.findByFromIdToId( fromId, toId );
        if (fromId != toId) {
            List<Message> tMessages = messageDao.findByFromIdToId( toId, fromId );
            messages.addAll( tMessages );
            messages.sort( Comparator.comparing( Message::getId ) );
        }
        Collections.reverse( messages );
        return (List<Message>) messages;
    }
}
