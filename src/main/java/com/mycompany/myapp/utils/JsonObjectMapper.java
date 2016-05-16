package com.mycompany.myapp.utils;

import java.io.IOException;
import java.lang.reflect.Type;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonObjectMapper extends ObjectMapper{
	
	 private static final long serialVersionUID = 1761469313568633110L;

	    @SuppressWarnings("unchecked")
	    public <T> T readValue(String content, Type type) throws IOException, JsonParseException, JsonMappingException {
		return (T) _readMapAndClose(_jsonFactory.createParser(content), _typeFactory.constructType(type));
	    }

}
