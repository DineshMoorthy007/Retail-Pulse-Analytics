package com.retailpulse.controller;

import com.retailpulse.repository.RetailOrderRepository.AovByChannel;
import com.retailpulse.repository.RetailOrderRepository.SalesByCategory;
import com.retailpulse.service.RetailAnalyticsService;
import com.retailpulse.service.RetailAnalyticsService.CustomerSpendingDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
@CrossOrigin(origins = "*") // Prevents CORS errors when the React frontend connects from a different port
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
