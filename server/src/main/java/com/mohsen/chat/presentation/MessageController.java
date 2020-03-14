package com.mohsen.chat.presentation;

import com.mohsen.chat.business.Message.MessageService;
import com.mohsen.chat.domain.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
public class MessageController {

    @Autowired
    private MessageService messageService;

    @MessageMapping("/chat/{fromId}/{toId}")
    @SendTo("/topic/chat/{toId}/{fromId}")
    public Message createMessage(
            Message message) {
        Message resMessage = messageService.saveMessage(message);
        return resMessage;
    }

    @MessageMapping("/typing/{fromId}/{toId}")
    @SendTo("/topic/typing/{toId}/{fromId}")
    public String typingMessage(String typing) {
        return typing;
    }
//    @RequestMapping(method = {RequestMethod.POST}, value = "/chat/message")
//    @MessageMapping("/chat/message")
//    @SendTo("/topic/greetings")
//    public ResponseEntity<Message> saveMessage(Message message) {
////        Message resMessage = messageService.saveMessage(message);
////        return  resMessage;
////        this.simpMessagingTemplate.convertAndSend("/topic/news", message)
//        return new ResponseEntity<>(message, HttpStatus.CREATED);
//    }



    @RequestMapping(method = {RequestMethod.GET}, value = "/chat/conversation")
    public ResponseEntity<List<Message>> getMessages(
            @RequestParam(name = "fromId") int fromId,
            @RequestParam(name = "toId") int toId
    ) {
        List<Message> messages = messageService.getConversation(fromId, toId);
        return new ResponseEntity<>(messages, HttpStatus.OK);
    }
}
