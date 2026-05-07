package com.retailpulse.backend.controller;

import com.retailpulse.backend.repository.RetailOrderRepository.AovByChannel;
import com.retailpulse.backend.repository.RetailOrderRepository.SalesByCategory;
import com.retailpulse.backend.service.RetailAnalyticsService;
import com.retailpulse.backend.service.RetailAnalyticsService.CustomerSpendingDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RetailAnalyticsController {

    private final RetailAnalyticsService analyticsService;

    @GetMapping("/sales-by-category")
    public ResponseEntity<List<SalesByCategory>> getSalesByCategory() {
        return ResponseEntity.ok(analyticsService.getSalesByCategory());
    }

    @GetMapping("/top-customers")
    public ResponseEntity<List<CustomerSpendingDTO>> getTopCustomers(
            @RequestParam(name = "limit", defaultValue = "10") int limit) {
        return ResponseEntity.ok(analyticsService.getTopCustomers(limit));
    }

    @GetMapping("/aov-by-channel")
    public ResponseEntity<List<AovByChannel>> getAovByChannel() {
        return ResponseEntity.ok(analyticsService.getAovByChannel());
    }
}
