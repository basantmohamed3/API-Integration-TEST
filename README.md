# API Integration Test

## Overview

This repository contains solutions for the following tasks:

- **Section 1: API Design and Implementation**
- **Section 2: Troubleshooting and Debugging**
- **Section 3: Quick SQL Query**
- **Section 4: Knowledge Check**

### Section 1: API Design and Implementation

In **Section 1**, I implemented a Node.js integration with the HubSpot API to fetch and log "high-priority" deals,

You can find the code for Section 1 in the `sectionTwo` folder in this repository.

### Section 2: Troubleshooting and Debugging

In **Section 2**, I addressed common issues in the provided code snippet.
You can find the updated code in the `sectionTwo` folder.

---

### Section 3: Quick SQL Query

**Task**: Write a SQL query to retrieve all entries from a table named `integrations_log` where `status = 'error'` and `timestamp` is within the last 7 days.

**Solution**:
```sql
SELECT * 
FROM integrations_log
WHERE status = 'error'
AND timestamp >= NOW() - INTERVAL 7 DAY;


-- 

### Section 4: Knowledge Check

**Task**:  Explain in 1-2 sentences how you would handle rate limits for an API call that needs to process high volumes of data.

**Solution**:

To handle API rate limits, I would implement a retry mechanism with backoff, where the system waits longer between retries after hitting a rate limit (e.g., HTTP 429). Additionally, I would respect the Retry-After header, if available, to avoid making repeated requests before the limit resets.

