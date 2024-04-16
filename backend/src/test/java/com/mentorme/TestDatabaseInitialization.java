package com.mentorme;

import jakarta.persistence.EntityManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@Service
public class TestDatabaseInitialization {
    private static final String filepath = "/database/scripts/test.sql";

    public static void initializeJpa(EntityManager em) {
//        em.cre
    }
    public static void initializeJdbc(JdbcTemplate jdbc) {
        // Get Database Create Script
        List<String> sqlScriptTest = new ArrayList<>();
        try {
            Scanner fp = new Scanner(new BufferedReader(new FileReader(filepath)));
            while (fp.hasNext()) {
                sqlScriptTest.add(fp.nextLine().trim());
            }
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }

        // Execute line-by-line initialization script
        String executableStmt = "";
        for (String stmt : sqlScriptTest) {
            if (stmt.trim().isBlank() || stmt.startsWith("-- ")) continue;

            executableStmt = executableStmt.concat(stmt);

            if (stmt.endsWith(";")) {
                jdbc.execute(executableStmt);//.substring(0, executableStmt.length() - 1));
                executableStmt = "";
            }
        }
    }
}