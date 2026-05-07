package com.retailpulse.backend.service;

import com.retailpulse.backend.repository.RetailOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RetailAnalyticsService {

    private final RetailOrderRepository retailOrderRepository;

    public List<RetailOrderRepository.SalesByCategory> getSalesByCategory() {
        return retailOrderRepository.getTotalSalesByCategory();
    }

    public List<CustomerSpendingDTO> getTopCustomers(int limit) {
        // We map the projection to a cleaner DTO to avoid JSON infinite recursion 
        // issues with the Customer entity's @OneToMany 'orders' collection.
        return retailOrderRepository.getTopCustomersBySpending(PageRequest.of(0, limit))
                .stream()
                .map(cs -> new CustomerSpendingDTO(
                        cs.getCustomerId(),
                        cs.getName(),
                        cs.getEmail(),
                        cs.getTotalSpent()
                ))
                .toList();
    }

    public List<RetailOrderRepository.AovByChannel> getAovByChannel() {
        return retailOrderRepository.getAverageOrderValuePerChannel();
    }

    // DTO formatted purely for frontend consumption
    public record CustomerSpendingDTO(
            Long customerId,
            String name,
            String email,
            BigDecimal totalSpent
    ) {}
}
