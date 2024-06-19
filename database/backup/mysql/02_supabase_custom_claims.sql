-- is_claims_admin function converted to MySQL
DELIMITER //
CREATE FUNCTION is_claims_admin() RETURNS BOOLEAN
    DETERMINISTIC
BEGIN
    DECLARE jwt_exp NUMERIC;
    DECLARE jwt_role VARCHAR(255);
    DECLARE claims_admin BOOLEAN;

    SET jwt_exp = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(@@session.request_jwt_claims, '$.exp')), '0') + 0;
    SET jwt_role = JSON_UNQUOTE(JSON_EXTRACT(@@session.request_jwt_claims, '$.role'));
    SET claims_admin = JSON_UNQUOTE(JSON_EXTRACT(@@session.request_jwt_claims, '$.app_metadata.claims_admin')) = 'true';

    IF CURRENT_USER() = 'authenticator' THEN
        IF UNIX_TIMESTAMP() > jwt_exp THEN
            RETURN FALSE; -- jwt expired
        END IF;
        IF jwt_role = 'service_role' THEN
            RETURN TRUE; -- service role users have admin rights
        END IF;
        IF claims_admin THEN
            RETURN TRUE; -- user has claims_admin set to true
        ELSE
            RETURN FALSE; -- user does NOT have claims_admin set to true
        END IF;
    ELSE
        RETURN TRUE; -- not a user session, probably being called from a trigger or something
    END IF;
END;
//
DELIMITER ;

-- get_my_claims function converted to MySQL
DELIMITER //
CREATE FUNCTION get_my_claims() RETURNS JSON
    DETERMINISTIC
BEGIN
    RETURN COALESCE(
        NULLIF(@@session.request_jwt_claims, ''),
        JSON_OBJECT()
    ) -> '$.app_metadata';
END;
//
DELIMITER ;

-- get_my_claim function converted to MySQL
DELIMITER //
CREATE FUNCTION get_my_claim(claim VARCHAR(255)) RETURNS JSON
    DETERMINISTIC
BEGIN
    RETURN COALESCE(
        NULLIF(@@session.request_jwt_claims, ''),
        JSON_OBJECT()
    ) -> CONCAT('$.app_metadata.', claim);
END;
//
DELIMITER ;

-- get_claims function converted to MySQL
DELIMITER //
CREATE FUNCTION get_claims(uid CHAR(36)) RETURNS JSON
    DETERMINISTIC
BEGIN
    DECLARE retval JSON;
    IF NOT is_claims_admin() THEN
        RETURN JSON_OBJECT('error', 'access denied');
    ELSE
        SELECT raw_app_meta_data INTO retval
        FROM auth_users
        WHERE id = uid;
        RETURN retval;
    END IF;
END;
//
DELIMITER ;

-- get_claim function converted to MySQL
DELIMITER //
CREATE FUNCTION get_claim(uid CHAR(36), claim VARCHAR(255)) RETURNS JSON
    DETERMINISTIC
BEGIN
    DECLARE retval JSON;
    IF NOT is_claims_admin() THEN
        RETURN JSON_OBJECT('error', 'access denied');
    ELSE
        SELECT COALESCE(
            JSON_UNQUOTE(JSON_EXTRACT(raw_app_meta_data, CONCAT('$.', claim))),
            NULL
        ) INTO retval
        FROM auth_users
        WHERE id = uid;
        RETURN retval;
    END IF;
END;
//
DELIMITER ;

-- set_claim function converted to MySQL
DELIMITER //
CREATE FUNCTION set_claim(uid CHAR(36), claim VARCHAR(255), value JSON) RETURNS TEXT
    DETERMINISTIC
BEGIN
    IF NOT is_claims_admin() THEN
        RETURN 'error: access denied';
    ELSE
        UPDATE auth_users
        SET raw_app_meta_data = JSON_MERGE_PATCH(
            raw_app_meta_data,
            JSON_OBJECT(claim, value)
        )
        WHERE id = uid;
        RETURN 'OK';
    END IF;
END;
//
DELIMITER ;

-- delete_claim function converted to MySQL
DELIMITER //
CREATE FUNCTION delete_claim(uid CHAR(36), claim VARCHAR(255)) RETURNS TEXT
    DETERMINISTIC
BEGIN
    IF NOT is_claims_admin() THEN
        RETURN 'error: access denied';
    ELSE
        UPDATE auth_users
        SET raw_app_meta_data = JSON_REMOVE(raw_app_meta_data, CONCAT('$.', claim))
        WHERE id = uid;
        RETURN 'OK';
    END IF;
END;
//
DELIMITER ;

-- Notify part is not applicable in MySQL
-- NOTIFY pgrst, 'reload schema';
