
USE MASTER

Declare @DbName nvarchar(100) = 'Sabio01'
Declare @LogInName nvarchar(100) = 'SabioUser'
Declare @Password nvarchar(100) = 'Sabiopass1!'

Declare @CMD_CreateLogin nvarchar(1000) = N'CREATE LOGIN '+@LogInName+' WITH PASSWORD=N'''+@Password+'''
, DEFAULT_DATABASE = MASTER, DEFAULT_LANGUAGE = US_ENGLISH 

'

	Declare @enable nvarchar(1000) = 'ALTER LOGIN '+@LogInName+' ENABLE;'
	Print @CMD_CreateLogin


	IF Not Exists (select 1 from master.dbo.syslogins where name = @LogInName)
	BEGIN
		EXECUTE sp_executesql @CMD_CreateLogin
		EXEC sp_executesql @enable
		Print 'Sql Login verified and enabled with password:' + @Password
	END
	ELSE
	BEGIN
		EXEC sp_executesql @enable
		Print 'Sql Login Existed Already. Script only enabled with password'
	END

	



-----------------
-- Creating the Database
------------------

USE MASTER;

	IF DB_ID (N'Sabio01') IS NULL
	BEGIN
		CREATE DATABASE Sabio01;
	END
	-- Verify the database files and sizes
	IF NOT EXISTS (SELECT 1 FROM sys.master_files WHERE name = N'Sabio01')
	BEGIN
		Print '!!!!!!!!!!!!! There was an error creating the Database '
		return;
	END


--Make sure to use the MASTER database when you create logins and make sure the login is ENABLED.
--After creating a Login, you can now create a user and add the user to the new Login:

USE Sabio01

	Declare @CMD_CreateDbUser nvarchar(1000) = N'CREATE USER '+@LogInName+' FOR LOGIN '+ @LogInName+ ' WITH DEFAULT_SCHEMA = [DBO]'


	IF NOT Exists (	SELECT 1		
					FROM [sys].[database_principals]
					WHERE [type] = 'S' and [name] = @LogInName)
	BEGIN
			Print @CMD_CreateDbUser
			EXECUTE sp_executesql @CMD_CreateDbUser

			Print 'Database user created for .'
	END
	ElSE
	BEGIN
			Print 'Database user ' +@LogInName+  'Already Existed for Sabio01'
	END
	

	EXEC  sp_addrolemember 'db_owner', @LogInName