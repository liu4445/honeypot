package com.honey.backend.load;

import com.honey.backend.load.assembly.AssemblyLoadService;
import com.honey.backend.load.bill.BillLoadService;
import com.honey.backend.load.committee.CommitteeLoadService;
import com.honey.backend.load.hotissue.HotIssueLoadService;
import com.honey.backend.load.poly.PolyLoadService;
import com.honey.backend.load.region.RegionLoadService;
import com.honey.backend.load.sns.SnsLoadService;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import jakarta.xml.bind.JAXBException;
import java.io.IOException;

@Service
@Transactional
@RequiredArgsConstructor
public class DataLoadService {


    private final RegionLoadService regionLoadService;

    private final AssemblyLoadService assemblyLoadService;

    private final BillLoadService billLoadService;

    private final CommitteeLoadService committeeLoadService;
    private final PolyLoadService polyLoadService;
    private final SnsLoadService snsLoadService;
   // private final HotIssueLoadService hotIssueLoadService;
 //   @PostConstruct
    public void init() {
        billLoadService.insert();
//        try {
//            regionLoadService.insertRegion();
//            committeeLoadService.insertCommittee();
//            polyLoadService.insertPoly();
//            assemblyLoadService.insert();
//            snsLoadService.insertSns();;
//
//        //    hotIssueLoadService.getIssue();
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }

    }


}
