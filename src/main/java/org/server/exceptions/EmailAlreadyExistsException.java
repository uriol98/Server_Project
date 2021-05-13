package org.server.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.NOT_FOUND, reason="Email already exists")
public class EmailAlreadyExistsException extends RuntimeException {
}