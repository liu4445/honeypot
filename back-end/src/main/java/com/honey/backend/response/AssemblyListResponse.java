package com.honey.backend.response;

import java.util.List;

public record AssemblyListResponse(
        List<AssemblyCardResponse> assemblyCardResponseList,
        int count
) {
}
