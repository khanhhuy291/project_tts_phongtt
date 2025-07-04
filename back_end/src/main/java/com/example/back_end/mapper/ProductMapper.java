package com.example.back_end.mapper;

import com.example.back_end.dto.request.ProductCreationRequest;
import com.example.back_end.dto.request.ProductUpdateRequest;
import com.example.back_end.dto.response.ProductResponse;
import com.example.back_end.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    Product toProduct(ProductCreationRequest request);

    ProductResponse toProductResponse(Product product);

    void updateProduct(@MappingTarget Product product, ProductUpdateRequest request);
}