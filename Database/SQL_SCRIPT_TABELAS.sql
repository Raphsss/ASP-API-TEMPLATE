IF DB_ID('dbFinanceiro') IS NULL
    BEGIN
    CREATE DATABASE dbFinanceiro;
    END

IF OBJECT_ID('dbo.AGENCIA', 'U') IS NULL
    BEGIN
    CREATE TABLE dbo.AGENCIA (
        Codigo INT IDENTITY(1,1) PRIMARY KEY,
        Nome VARCHAR(100),
        Cidade VARCHAR(100),
        EstadoUF VARCHAR(100)
    );
    END
GO
