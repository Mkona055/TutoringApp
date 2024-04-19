package com.mentorme;

import jakarta.persistence.EntityManager;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

@Component
public class TestDatabaseInitialization {
    private static final String filepath = "../database/scripts/test.sql";
 //new FileReader(System.getProperty("user.dir")+"/"+path
    public static void initializeJpa(EntityManager em) {
        // Get Database Create Script
        List<String> sqlScriptTest = new ArrayList<>();
        try {
            Scanner fp = new Scanner(new BufferedReader(new FileReader(filepath)));
            while (fp.hasNext()) {
                sqlScriptTest.add(fp.nextLine().trim());
            }
            fp.close();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }

        // Execute line-by-line initialization script
        String executableStmt = "";
        for (String stmt : sqlScriptTest) {
            if (stmt.trim().isBlank() || stmt.startsWith("-- ")) continue;

            executableStmt = executableStmt.concat(stmt);

            if (stmt.endsWith(";")) {
                em.createNativeQuery(executableStmt);//.substring(0, executableStmt.length() - 1));
                executableStmt = "";
            }
        }
    }
    public static void initializeJdbc(JdbcTemplate jdbc) {
        // Get Database Create Script
        List<String> sqlScriptTest = new ArrayList<>();
        try {
            Scanner fp = new Scanner(new BufferedReader(new FileReader(filepath)));
            while (fp.hasNext()) {
                sqlScriptTest.add(fp.nextLine().trim());
            }
            fp.close();
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
