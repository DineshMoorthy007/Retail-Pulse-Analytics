package com.retailpulse.backend.repository;

import com.retailpulse.backend.model.OrderChannel;
import com.retailpulse.backend.model.RetailOrder;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface RetailOrderRepository extends JpaRepository<RetailOrder, Long> {

    /**
     * 1. Total sales by product category.
     */
    @Query("SELECT p.category AS category, SUM(oi.subTotal) AS totalSales " +
           "FROM RetailOrder ro " +
           "JOIN ro.orderItems oi " +
           "JOIN oi.product p " +
           "GROUP BY p.category")
    List<SalesByCategory> getTotalSalesByCategory();

    /**
     * 2. Top N customers by total spending.
     * Note: Pass `PageRequest.of(0, N)` as the Pageable argument to limit the results.
     */
    @Query("SELECT c.id AS customerId, c.name AS name, c.email AS email, SUM(ro.totalAmount) AS totalSpent " +
           "FROM RetailOrder ro " +
           "JOIN ro.customer c " +
           "GROUP BY c.id, c.name, c.email " +
           "ORDER BY SUM(ro.totalAmount) DESC")
    List<CustomerSpending> getTopCustomersBySpending(Pageable pageable);

    /**
     * 3. Average order value (AOV) per channel.
     */
    @Query("SELECT ro.orderChannel AS channel, AVG(ro.totalAmount) AS averageOrderValue " +
           "FROM RetailOrder ro " +
           "GROUP BY ro.orderChannel")
    List<AovByChannel> getAverageOrderValuePerChannel();

    // --- Spring Data JPA Projections ---

    interface SalesByCategory {
        String getCategory();
        BigDecimal getTotalSales();
    }

    interface CustomerSpending {
        Long getCustomerId();
        String getName();
        String getEmail();
        BigDecimal getTotalSpent();
    }

    interface AovByChannel {
        OrderChannel getChannel();
        BigDecimal getAverageOrderValue();
    }
}
