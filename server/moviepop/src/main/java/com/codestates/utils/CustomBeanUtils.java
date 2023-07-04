package com.codestates.utils;

import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Component;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.util.Collection;

@Component
public class CustomBeanUtils<T> {
    public T copyNonNullProperties(T source
                                    , T destination
                                    ) {
        if (source == null || destination ==null || source.getClass() != destination.getClass()) {
            return null;
        }

        final BeanWrapper src = new BeanWrapperImpl(source);
        final BeanWrapper dest = new BeanWrapperImpl(destination);

        for(final Field field : source.getClass().getDeclaredFields()) {
            PropertyDescriptor propertyDescriptor = src.getPropertyDescriptor(field.getName());
            String propertyName = propertyDescriptor.getPropertyType().getSimpleName();
            // JPA Lazy 로딩 특성으로 인해 연관된 컬렉션의 조회 쿼리가 발생하므로 컬렉션의 경우 패스한다.
            if (propertyName.equals("List")) {
                continue;
            }
            if(field.getName().equals("userId")) continue;

            Object sourceProperty = src.getPropertyValue(field.getName());
            if (sourceProperty != null && !(sourceProperty instanceof Collection<?>)) {
                dest.setPropertyValue(field.getName(), sourceProperty);
            }
        }

        return destination;
        }
}
