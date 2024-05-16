package com.example.websocket.websocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.websocket.websocket.entity.Message;

@RestController
@RequestMapping
public class MessageController {
	
	@MessageMapping("/message")
	@SendTo("/topic/return-to")
	public Message getContent(@RequestBody Message message) {
		
		
		
		try {
			
			Thread.sleep(2000);
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return message;
		
	}

}
