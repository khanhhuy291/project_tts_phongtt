package com.example.back_end.service;

import com.example.back_end.dto.request.ProductCreationRequest;
import com.example.back_end.dto.request.ProductUpdateRequest;
import com.example.back_end.dto.response.ProductResponse;
import com.example.back_end.entity.Product;
import com.example.back_end.exception.AppException;
import com.example.back_end.exception.ErrorCode;
import com.example.back_end.mapper.ProductMapper;
import com.example.back_end.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public Product createProduct(ProductCreationRequest request) {
        Product product = productMapper.toProduct(request);
        return productRepository.save(product);
    }

    public Page<Product> getAllProducts(Pageable pageable) {
        return productRepository.findAll(pageable);
    }

    public ProductResponse getProductById(String id) {
        return productMapper.toProductResponse(productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.UNCATEGORIED_EXCEPTION)));
    }

    public ProductResponse updateProduct(String id, ProductUpdateRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.UNCATEGORIED_EXCEPTION));
        productMapper.updateProduct(product, request);
        return productMapper.toProductResponse(productRepository.save(product));
    }

    public void deleteProduct(String id) {
        productRepository.deleteById(id);
    }
}