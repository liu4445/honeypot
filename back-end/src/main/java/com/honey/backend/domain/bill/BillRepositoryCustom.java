package com.honey.backend.domain.bill;

import com.honey.backend.response.BillStatResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BillRepositoryCustom {



    Page<Bill> findAllByAssemblyIdAndCmitId(Pageable pageable, String word, Long cmitId, Long assemblyId);

    BillStatResponse findBillStatByAssemblyIdAndCmitId(Long assemblyId, Long cmitId);

    Long countByAssemblyIdAndCmitId(String word, Long cmitId, Long assemblyId);

    Page<Bill> findAllByPolyIdAndCmitId(Pageable pageable, String word, Long cmitId, Long polyId);

    BillStatResponse findBillStatByPolyIdAndCmitId(Long polyId, Long cmitId);

    Long countByPolyIdAndCmitId(String word, Long cmitId, Long polyId);
}
