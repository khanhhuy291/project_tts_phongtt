package com.example.back_end.controller;

import com.example.back_end.dto.request.ApiResponse;
import com.example.back_end.dto.request.ProductCreationRequest;
import com.example.back_end.dto.request.ProductUpdateRequest;
import com.example.back_end.dto.response.ProductResponse;
import com.example.back_end.entity.Product;
import com.example.back_end.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")

@RestController
@RequestMapping("/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping
    ApiResponse<Product> createProduct(@RequestBody @Valid ProductCreationRequest request) {
        ApiResponse<Product> apiResponse = new ApiResponse<>();
        apiResponse.setResult(productService.createProduct(request));
        return apiResponse;
    }

    @GetMapping
    Page<Product> getAllProducts(Pageable pageable) {
        return productService.getAllProducts(pageable);
    }

    @GetMapping("/{productId}")
    ProductResponse getProduct(@PathVariable String productId) {
        return productService.getProductById(productId);
    }

    @PutMapping("/{productId}")
    ProductResponse updateProduct(@PathVariable String productId, @RequestBody ProductUpdateRequest request) {
        return productService.updateProduct(productId, request);
    }

    @DeleteMapping("/{productId}")
    String deleteProduct(@PathVariable String productId) {
        productService.deleteProduct(productId);
        return "Product has been deleted";
    }
}