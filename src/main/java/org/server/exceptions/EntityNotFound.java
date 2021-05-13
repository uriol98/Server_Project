package org.server.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value= HttpStatus.NOT_FOUND, reason="User with that email doesnt exists")  // 404
public class EntityNotFound extends RuntimeException {
}