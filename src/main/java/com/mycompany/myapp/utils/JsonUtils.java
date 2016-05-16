package com.mycompany.myapp.utils;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.TimeZone;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonFactory;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.MapperFeature;
import com.fasterxml.jackson.databind.PropertyNamingStrategy.PropertyNamingStrategyBase;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.joda.JodaModule;

@SuppressWarnings("unchecked")
public class JsonUtils {

	private final static Logger LOGGER = LoggerFactory
			.getLogger(JsonUtils.class);

	private final static JsonObjectMapper JAVA_OBJECT_MAPPER = buildDefaultObjectMapper();

	private final static JsonObjectMapper C_SHARP_OBJECT_MAPPER=null;

	public static JsonObjectMapper getMapperInstance(boolean isCreateNewMapper) {
		JsonObjectMapper objectMapper;
		if (isCreateNewMapper) {
			objectMapper = buildDefaultObjectMapper();
		} else {
			objectMapper = JAVA_OBJECT_MAPPER;
		}
		return objectMapper;
	}

	private static JsonObjectMapper buildDefaultObjectMapper() {
		JsonObjectMapper objectMapper = new JsonObjectMapper();

		objectMapper.getFactory()
				.enable(JsonFactory.Feature.INTERN_FIELD_NAMES);
		objectMapper.getFactory().enable(
				JsonFactory.Feature.CANONICALIZE_FIELD_NAMES);
		objectMapper.configure(JsonParser.Feature.ALLOW_COMMENTS, true);
		objectMapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_FIELD_NAMES,
				true);
		objectMapper.configure(JsonParser.Feature.ALLOW_SINGLE_QUOTES, true);
		objectMapper.configure(JsonParser.Feature.ALLOW_UNQUOTED_CONTROL_CHARS,
				true);
		objectMapper.configure(
				DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		objectMapper
				.configure(
						DeserializationFeature.ACCEPT_EMPTY_STRING_AS_NULL_OBJECT,
						true);

		objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
		objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
		//objectMapper.setTimeZone(TimeZone.getTimeZone("GMT+8"));
		//objectMapper.setDateFormat(new HzStdDateFormat());
		objectMapper.registerModule(new JodaModule());
		return objectMapper;
	}

	/**
	 * 将java对象转换成json字符串
	 * 
	 * @param obj
	 *            准备转换的对象
	 * @return json字符串
	 * @throws Exception
	 */
	public static String beanToJson(Object obj) {

		String json = null;
		try {
			JsonObjectMapper objectMapper = getMapperInstance(false);
			json = objectMapper.writeValueAsString(obj);
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
		}
		return json;
	}

	/**
	 * 将java对象转换成json字符串，忽略Annotaion
	 * 
	 * @param obj
	 *            准备转换的对象
	 * @return json字符串
	 * @throws Exception
	 */
	public static String beanToJsonIgnoreAnnotaion(Object obj) {

		String json = null;
		try {
			JsonObjectMapper objectMapper = getMapperInstance(true);
			objectMapper.configure(MapperFeature.USE_ANNOTATIONS, false);
			json = objectMapper.writeValueAsString(obj);
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
		}
		return json;
	}

	/**
	 * 将java对象转换成json字符串
	 * 
	 * @param obj
	 *            准备转换的对象
	 * @param createNew
	 *            ObjectMapper实例方式:true，新实例;false,存在的mapper实例
	 * @return json字符串
	 * @throws Exception
	 */
	public static String beanToJson(Object obj, Boolean createNew) {

		String json = null;
		try {
			JsonObjectMapper objectMapper = getMapperInstance(createNew);
			json = objectMapper.writeValueAsString(obj);
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
		}
		return json;

	}

	/**
	 * 将json字符串转换成java对象
	 * 
	 * @param json
	 *            准备转换的json字符串
	 * @param cls
	 *            准备转换的类
	 * @return
	 * @throws Exception
	 */
	public static <T> T jsonToBean(String json, Class<T> cls) {

		T t = null;
		try {
			if (String.class.equals(cls)) {
				t = (T) json;
			} else {
				JsonObjectMapper objectMapper = getMapperInstance(false);
				t = objectMapper.readValue(json, cls);
			}
		} catch (IOException e) {
			LOGGER.error(e.getMessage(), e);
		}
		return t;
	}

	public static <T> T jsonToBean(String json, Type type) {

		T t = null;
		try {
			if (String.class.equals(type)) {
				t = (T) json;
			} else {
				JsonObjectMapper objectMapper = getMapperInstance(false);
				t = objectMapper.readValue(json, type);
			}
		} catch (IOException e) {
			LOGGER.error(e.getMessage(), e);
		}
		return t;
	}

	

	public static <T> T jsonToBean(String json, TypeReference<T> cls) {

		T t = null;
		try {
			JsonObjectMapper objectMapper = getMapperInstance(false);
			t = objectMapper.readValue(json, cls);
		} catch (IOException e) {
			LOGGER.error(e.getMessage(), e);
		}
		return t;
	}

	/**
	 * 将json字符串转换成java对象
	 * 
	 * @param json
	 *            准备转换的json字符串
	 * @param cls
	 *            准备转换的类
	 * @param createNew
	 *            ObjectMapper实例方式:true，新实例;false,存在的mapper实例
	 * @return
	 * @throws Exception
	 */
	public static <T> T jsonToBean(String json, Class<T> cls, Boolean createNew) {

		T t = null;
		try {
			if (String.class.equals(cls)) {
				t = (T) json;
			} else {
				JsonObjectMapper objectMapper = getMapperInstance(createNew);
				t = objectMapper.readValue(json, cls);
			}
		} catch (IOException e) {
			LOGGER.error(e.getMessage(), e);
		}
		return t;
	}

//	public static String beanToJson(Object obj, String lang) {
//
//		String json = null;
//		try {
//
//			JsonObjectMapper objectMapper = JAVA_OBJECT_MAPPER;
//			if (CommonConstants.LANG_OF_C_SHARP_AUTO_CONVERT.equals(lang)) {
//				objectMapper = C_SHARP_OBJECT_MAPPER;
//			}
//			json = objectMapper.writeValueAsString(obj);
//		} catch (Exception e) {
//			LOGGER.error(e.getMessage(), e);
//		}
//		return json;
//	}

	public static String beanToJson(Object... objects) {

		String json = null;
		if (objects != null) {
			try {
				JsonObjectMapper objectMapper = getMapperInstance(false);
				json = objectMapper.writeValueAsString(objects);
			} catch (Exception e) {
				LOGGER.error(e.getMessage(), e);
			}
		}
		return json;
	}
}
