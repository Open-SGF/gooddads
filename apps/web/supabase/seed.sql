INSERT INTO auth.users (instance_id,
                        id,
                        aud,
                        "role",
                        email,
                        encrypted_password,
                        email_confirmed_at,
                        confirmation_token,
                        recovery_token,
                        email_change_token_new,
                        email_change,
                        last_sign_in_at,
                        raw_app_meta_data,
                        raw_user_meta_data,
                        is_super_admin,
                        created_at,
                        updated_at)
VALUES ('00000000-0000-0000-0000-000000000000',
        'd55f3b79-9004-4bc4-af5c-7fcc1478345a',
        'authenticated',
        'authenticated',
        'intake@email.local',
        '$2a$10$qL.GCoX1QNlYl9S80a4fAeku1f.IwcDtdkcBbqpWDnaf3xxAVL2Cm',
        '2023-04-03 16:40:17.367996-07',
        '',
        '',
        '',
        '',
        '2023-04-03 16:40:17.367996-07',
        '{
          "provider": "email",
          "providers": [
            "email"
          ],
          "userrole": "INTAKE"
        }',
        '{}',
        NULL,
        '2023-04-03 16:39:30.424482-07',
        '2023-04-03 16:40:17.36902-07'),
       ('00000000-0000-0000-0000-000000000000',
        'f3a51eed-f45a-413f-89f2-d3de7659fba2',
        'authenticated',
        'authenticated',
        'dad@email.local',
        '$2a$10$qL.GCoX1QNlYl9S80a4fAeku1f.IwcDtdkcBbqpWDnaf3xxAVL2Cm',
        '2023-04-03 16:40:17.367996-07',
        '',
        '',
        '',
        '',
        '2023-04-03 16:40:17.367996-07',
        '{
          "provider": "email",
          "providers": [
            "email"
          ],
          "userrole": "DAD"
        }',
        '{}',
        NULL,
        '2023-04-03 16:39:30.424482-07',
        '2023-04-03 16:40:17.36902-07'),
       ('00000000-0000-0000-0000-000000000000',
        '6b16fb9b-246d-44a2-b253-b7896c74e852',
        'authenticated',
        'authenticated',
        'admin@email.local',
        '$2a$10$qL.GCoX1QNlYl9S80a4fAeku1f.IwcDtdkcBbqpWDnaf3xxAVL2Cm',
        '2023-04-03 16:40:17.367996-07',
        '',
        '',
        '',
        '',
        '2023-04-03 16:40:17.367996-07',
        '{
          "provider": "email",
          "providers": [
            "email"
          ],
          "userrole": "ADMIN",
          "claims_admin": true
        }',
        '{}',
        NULL,
        '2023-04-03 16:39:30.424482-07',
        '2023-04-03 16:40:17.36902-07'
       ) ON CONFLICT DO NOTHING;

INSERT INTO public.users
VALUES ('d55f3b79-9004-4bc4-af5c-7fcc1478345a', CURRENT_TIMESTAMP, 'DevUser', 'John Brown', '/TestAvatar1'),
       ('f3a51eed-f45a-413f-89f2-d3de7659fba2', CURRENT_TIMESTAMP, 'InvitedUser', 'Tim Robin', '/TestAvatar1'),
       ('6b16fb9b-246d-44a2-b253-b7896c74e852', CURRENT_TIMESTAMP, 'AdminUser', 'Ron Burgundy', '/TestAvatar1') ON CONFLICT DO NOTHING;

insert into dads
    (id, user_id)
values ('6b16fb9b-246d-44a2-b253-b7896c74e852', 'd55f3b79-9004-4bc4-af5c-7fcc1478345a') ON CONFLICT DO NOTHING;

insert into class_assignments
(id, dad_id, class_id)
values
('8d22171c-cbf7-430f-a0be-6e3581092ad0', 'd55f3b79-9004-4bc4-af5c-7fcc1478345a', 'e2aca9c0-1901-4b56-88d8-3dbf15d91491') ON CONFLICT DO NOTHING;

insert into classes
(id, region_id)
values
('e2aca9c0-1901-4b56-88d8-3dbf15d91491', '34b3e6bc-ed47-4733-b80b-54ab31c48648') ON CONFLICT DO NOTHING;

insert into regions
(id, description)
values
('34b3e6bc-ed47-4733-b80b-54ab31c48648', 'Springfield Region') ON CONFLICT DO NOTHING;

insert into programs
    (id, description, length)
values ('4ba51388-c3fb-4d34-a81c-f1545618b6e6', '8 Week Program', 8) ON CONFLICT DO NOTHING;

insert into program_assignments
    (id, program_id, class_id, start_date, completed)
values ('9b95ed5b-11fc-4852-99e9-0a918941c56c', '4ba51388-c3fb-4d34-a81c-f1545618b6e6',
        'e2aca9c0-1901-4b56-88d8-3dbf15d91491', '2023-08-01', true),
       ('ac88d8fb-1947-4838-8f4a-404bd54e9d00', '4ba51388-c3fb-4d34-a81c-f1545618b6e6',
        'e2aca9c0-1901-4b56-88d8-3dbf15d91491', '2024-02-01', false) ON CONFLICT DO NOTHING;

insert into modules
    (id, program_id, description)
values ('d478b36f-be06-46cd-b427-2e3b958adf67', '4ba51388-c3fb-4d34-a81c-f1545618b6e6', 'Week 1 Module'),
       ('6b48ccff-aa7d-4eb3-b1dd-1415392c35d6', '4ba51388-c3fb-4d34-a81c-f1545618b6e6', 'Week 2 Module'),
       ('970be901-6b87-4aea-9520-df9d7ca9a6d8', '4ba51388-c3fb-4d34-a81c-f1545618b6e6', 'Week 3 Module'),
       ('36e3cabb-e1aa-4a34-a189-84986b2ef386', '4ba51388-c3fb-4d34-a81c-f1545618b6e6', 'Week 4 Module'),
       ('01119909-d4da-4777-9626-4cb259ae6bb7', '4ba51388-c3fb-4d34-a81c-f1545618b6e6', 'Week 5 Module'),
       ('eeed550a-992e-4c29-9d45-d8ae736b46e0', '4ba51388-c3fb-4d34-a81c-f1545618b6e6', 'Week 6 Module'),
       ('cb56107a-b93d-4d01-ba21-c6b889432e9c', '4ba51388-c3fb-4d34-a81c-f1545618b6e6', 'Week 7 Module'),
       ('71f78553-3c9f-4d69-ad93-2e2f9babdc78', '4ba51388-c3fb-4d34-a81c-f1545618b6e6', 'Week 8 Module') ON CONFLICT DO NOTHING ;

insert into module_assignments
    (id, module_id, event_date, description)
values ('17969228-cdc8-4c3e-a53d-15dcdbd3b70f', 'd478b36f-be06-46cd-b427-2e3b958adf67', '2024-02-01', 'Week 1 Module'),
       ('d714a8b2-0173-4442-8a26-e8b732122a00', '6b48ccff-aa7d-4eb3-b1dd-1415392c35d6', '2024-02-08', 'Week 2 Module'),
       ('f6a64655-1f4c-4a41-9560-1e691f95383c', '970be901-6b87-4aea-9520-df9d7ca9a6d8', '2024-02-15', 'Week 3 Module'),
       ('81a59cac-8587-42be-a4ea-3e442d817d42', '36e3cabb-e1aa-4a34-a189-84986b2ef386', '2024-02-22', 'Week 4 Module'),
       ('73332683-eb82-4630-a84f-1d89885e6cb8', '01119909-d4da-4777-9626-4cb259ae6bb7', '2024-02-29', 'Week 5 Module'),
       ('79de791a-c06d-4225-a17d-e34f8b350ccd', 'eeed550a-992e-4c29-9d45-d8ae736b46e0', '2024-03-07', 'Week 6 Module'),
       ('8256a49b-a4d9-4f3e-b45f-06d748e53174', 'cb56107a-b93d-4d01-ba21-c6b889432e9c', '2024-03-14', 'Week 7 Module'),
       ('086e8160-bf14-4c23-80d3-24798c43e890', '71f78553-3c9f-4d69-ad93-2e2f9babdc78', '2024-03-21', 'Week 8 Module') ON CONFLICT DO NOTHING;

insert into quizzes
    (id, module_id, description)
values ('aa2dc4bc-39f9-41f9-8e79-277e5b1d1248', 'd478b36f-be06-46cd-b427-2e3b958adf67', 'Week 1 Quiz'),
       ('a7373c71-097a-4222-b83b-459a5640851b', '6b48ccff-aa7d-4eb3-b1dd-1415392c35d6', 'Week 2 Quiz'),
       ('c7fd0cba-baaa-4460-a248-db739c712e85', '970be901-6b87-4aea-9520-df9d7ca9a6d8', 'Week 3 Quiz'),
       ('937f6927-0be5-4c81-b838-80071ffbf38c', '36e3cabb-e1aa-4a34-a189-84986b2ef386', 'Week 4 Quiz'),
       ('e12ce0d7-dbca-432a-8970-532466f7d1d3', '01119909-d4da-4777-9626-4cb259ae6bb7', 'Week 5 Quiz'),
       ('b9d23a3d-e1f7-472f-9521-7c61022bd7a5', 'eeed550a-992e-4c29-9d45-d8ae736b46e0', 'Week 6 Quiz'),
       ('f6aa1a1d-1b65-40f7-9780-5d5daf3ad236', 'cb56107a-b93d-4d01-ba21-c6b889432e9c', 'Week 7 Quiz'),
       ('c37a076f-a078-48a1-a8d7-fc33f1b3dda8', '71f78553-3c9f-4d69-ad93-2e2f9babdc78', 'Week 8 Quiz') ON CONFLICT DO NOTHING;

insert into quiz_questions
    (id, quiz_id, question, type)
values ('51de12be-e769-4efc-bc47-b1f067a1e24f', 'aa2dc4bc-39f9-41f9-8e79-277e5b1d1248', 'Example Week 1, Question 1?',
        'open'),
       ('39fb16e5-3831-4de4-b9d3-0a1db5c57428', 'aa2dc4bc-39f9-41f9-8e79-277e5b1d1248', 'Example Week 1, Question 2?',
        'multipleChoice'),
       ('51caf783-4ec9-412b-95dd-6f96bca13539', 'aa2dc4bc-39f9-41f9-8e79-277e5b1d1248', 'Example Week 1, Question 3?',
        'check'),
       ('b60e4639-66e3-47a7-97c8-9625b39628a2', 'a7373c71-097a-4222-b83b-459a5640851b', 'Example Week 2, Question 1?',
        'open'),
       ('00572a47-a90e-44ad-9e55-726cac5bb192', 'a7373c71-097a-4222-b83b-459a5640851b', 'Example Week 2, Question 2?',
        'multipleChoice'),
       ('2ff8be22-df7c-4d3c-af9a-6c80ccc6ee16', 'a7373c71-097a-4222-b83b-459a5640851b', 'Example Week 2, Question 3?',
        'check'),
       ('505749c3-a3c7-4501-ac96-c3835152bc7f', 'c7fd0cba-baaa-4460-a248-db739c712e85', 'Example Week 3, Question 1?',
        'open'),
       ('dd25fa86-8a52-4a7a-a536-81101db5577e', 'c7fd0cba-baaa-4460-a248-db739c712e85', 'Example Week 3, Question 2?',
        'multipleChoice'),
       ('aa25492d-ca8a-45c5-b730-9dbc893e831f', 'c7fd0cba-baaa-4460-a248-db739c712e85', 'Example Week 3, Question 3?',
        'check') ON CONFLICT DO NOTHING;

insert into quiz_question_options
    (id, quiz_question_id, answer, is_correct)
values ('4a91fe3b-8a54-4806-9e9f-b34e57d8a747', '39fb16e5-3831-4de4-b9d3-0a1db5c57428', 'Answer 1', false),
       ('b9b6fef5-a8ae-4f7a-bd34-c2247762f5ae', '39fb16e5-3831-4de4-b9d3-0a1db5c57428', 'Answer 2', true),
       ('dea40b69-d808-4b4e-aa4c-6cc43307bcbc', '39fb16e5-3831-4de4-b9d3-0a1db5c57428', 'Answer 3', false),
       ('d9aad4c6-c3da-4eb3-b96a-4bc0694c6c5c', '39fb16e5-3831-4de4-b9d3-0a1db5c57428', 'Answer 4', false),
       ('37a2b69e-a931-413c-a840-5df73a894c93', '51caf783-4ec9-412b-95dd-6f96bca13539', 'Check Answer 1', true),
       ('b802ff46-1fec-4e2e-82d7-b0284b4cadda', '51caf783-4ec9-412b-95dd-6f96bca13539', 'Check Answer 2', false),
       ('83439977-eecc-4932-bcfe-b74f3fd828db', '51caf783-4ec9-412b-95dd-6f96bca13539', 'Check Answer 3', false),
       ('f3e92d5f-6b80-443b-add1-227f252ff526', '51caf783-4ec9-412b-95dd-6f96bca13539', 'Check Answer 4', true),
       ('9300b583-90f7-4b50-b249-4b95be685ecd', '00572a47-a90e-44ad-9e55-726cac5bb192', 'Answer 1', false),
       ('116a9b2e-6ef3-42eb-8ec0-25a811aec39d', '00572a47-a90e-44ad-9e55-726cac5bb192', 'Answer 2', true),
       ('14726e4e-e5d4-44df-8b12-8acf98ff5d1a', '00572a47-a90e-44ad-9e55-726cac5bb192', 'Answer 3', false),
       ('b90af4da-b5af-4583-8ecc-2c786a68b152', '00572a47-a90e-44ad-9e55-726cac5bb192', 'Answer 4', false),
       ('628711b3-aee3-47c4-8f5a-6dfe5ceede53', '2ff8be22-df7c-4d3c-af9a-6c80ccc6ee16', 'Check Answer 1', true),
       ('52b148f6-ff73-4d47-ad31-6470c99e601d', '2ff8be22-df7c-4d3c-af9a-6c80ccc6ee16', 'Check Answer 2', false),
       ('62c9c4a9-f967-4d70-b242-18012e6d491c', '2ff8be22-df7c-4d3c-af9a-6c80ccc6ee16', 'Check Answer 3', false),
       ('f878f4a3-fc9f-4283-85f5-db7cd2d27eaf', '2ff8be22-df7c-4d3c-af9a-6c80ccc6ee16', 'Check Answer 4', true),
       ('f8efb226-57d0-46d6-9bc0-fdb1fd34bc0c', 'dd25fa86-8a52-4a7a-a536-81101db5577e', 'Answer 1', false),
       ('2e95d83f-2a17-4e73-bf20-b9d1250497bb', 'dd25fa86-8a52-4a7a-a536-81101db5577e', 'Answer 2', true),
       ('4eda4274-b32b-4181-980e-6fceff48bcac', 'dd25fa86-8a52-4a7a-a536-81101db5577e', 'Answer 3', false),
       ('e4ca1203-7138-4ba4-8b9c-b74912d2fc3a', 'dd25fa86-8a52-4a7a-a536-81101db5577e', 'Answer 4', false),
       ('e5e9fcaa-355a-4341-98f0-f50af48a48e5', 'aa25492d-ca8a-45c5-b730-9dbc893e831f', 'Check Answer 1', true),
       ('28d970ba-fa41-40cb-8c8f-547f4f117f93', 'aa25492d-ca8a-45c5-b730-9dbc893e831f', 'Check Answer 2', false),
       ('e861d2b7-5f7f-4179-bb7b-796db4c1da07', 'aa25492d-ca8a-45c5-b730-9dbc893e831f', 'Check Answer 3', false),
       ('5dd3d96a-fd87-41f3-a255-05b413a91754', 'aa25492d-ca8a-45c5-b730-9dbc893e831f', 'Check Answer 4', true) ON CONFLICT DO NOTHING;

insert into quiz_assignments
(id, user_id, quiz_question_id, quiz_question_option_id, answer, is_correct)
values ('965fbdef-fc39-4607-9277-be5be06096a1', 'd55f3b79-9004-4bc4-af5c-7fcc1478345a',
        '51de12be-e769-4efc-bc47-b1f067a1e24f', null, 'Example short response answer', false),
       ('458cf003-9fcd-47d5-8ad1-85f0843c0634', 'd55f3b79-9004-4bc4-af5c-7fcc1478345a',
        '39fb16e5-3831-4de4-b9d3-0a1db5c57428', '4a91fe3b-8a54-4806-9e9f-b34e57d8a747', '', false),
       ('4808c5e5-c48d-42ce-8c7f-402c2817c9c4', 'd55f3b79-9004-4bc4-af5c-7fcc1478345a',
        '51caf783-4ec9-412b-95dd-6f96bca13539', '37a2b69e-a931-413c-a840-5df73a894c93', '', true),
       ('66482580-c6f5-4dbb-b5a2-0c51358c25f7', 'd55f3b79-9004-4bc4-af5c-7fcc1478345a',
        '51caf783-4ec9-412b-95dd-6f96bca13539', 'b802ff46-1fec-4e2e-82d7-b0284b4cadda', '', false),
       ('7aa42a6a-ae53-4777-974d-8bbad9e223a5', 'd55f3b79-9004-4bc4-af5c-7fcc1478345a',
        'b60e4639-66e3-47a7-97c8-9625b39628a2', null, 'Example short response answer 2', false),
       ('05d7fc05-1dfe-4806-8e2d-8f0f4d73e9d6', 'd55f3b79-9004-4bc4-af5c-7fcc1478345a',
        '00572a47-a90e-44ad-9e55-726cac5bb192', '116a9b2e-6ef3-42eb-8ec0-25a811aec39d', '', true),
       ('fd9e729b-d049-4955-b2cb-44cca99091ad', 'd55f3b79-9004-4bc4-af5c-7fcc1478345a',
        '2ff8be22-df7c-4d3c-af9a-6c80ccc6ee16', '628711b3-aee3-47c4-8f5a-6dfe5ceede53', '', true),
       ('7e6a3995-a567-429e-afb1-fa4d08b1bb18', 'd55f3b79-9004-4bc4-af5c-7fcc1478345a',
        '2ff8be22-df7c-4d3c-af9a-6c80ccc6ee16', 'f878f4a3-fc9f-4283-85f5-db7cd2d27eaf', '', true) ON CONFLICT DO NOTHING;

insert into children
    (id, dad_id, name, date_of_birth, contact, child_support)
values ('0bdb6d02-79b7-4bcf-8b64-26957374518f', '6b16fb9b-246d-44a2-b253-b7896c74e852', 'James Brown', '2019-01-01',
        'Mother - (111)111-1111', 125.0) ON CONFLICT DO NOTHING;

insert into responsible_parties
    (id, user_id, phone_number, role)
values ('841c9bb0-b905-4ae8-9603-f602399df639', 'f3a51eed-f45a-413f-89f2-d3de7659fba2', '1111111111',
        'probationOfficer') ON CONFLICT DO NOTHING;

insert into responsible_party_assignments
    (id, responsible_party_id, dad_id)
values ('925aaa07-dfe4-4d59-a310-fe604e3319b6', '841c9bb0-b905-4ae8-9603-f602399df639',
        '6b16fb9b-246d-44a2-b253-b7896c74e852') ON CONFLICT DO NOTHING;
