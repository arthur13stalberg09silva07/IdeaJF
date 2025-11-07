CREATE TABLE customer (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL
);

CREATE TABLE idea (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NULL,
    CONSTRAINT fk_idea_customer
        FOREIGN KEY (customer_id)
        REFERENCES customer (id)
        ON DELETE CASCADE
);

CREATE TABLE vote (
    id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL,
    idea_id INT NOT NULL,
    value INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vote_customer
        FOREIGN KEY (customer_id)
        REFERENCES customer (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_vote_idea
        FOREIGN KEY (idea_id)
        REFERENCES idea (id)
        ON DELETE CASCADE,
    CONSTRAINT unique_vote UNIQUE (customer_id, idea_id)
);

INSERT INTO customer (name, email, password)
VALUES
('Alice Santos', 'alice.santos@example.com', 'hashed_password_1'),
('Bruno Lima', 'bruno.lima@example.com', 'hashed_password_2'),
('Carla Torres', 'carla.torres@example.com', 'hashed_password_3'),
('Diego Rocha', 'diego.rocha@example.com', 'hashed_password_4');

INSERT INTO idea (customer_id, title, description, category)
VALUES
(1, 'Sistema de Reciclagem Inteligente', 'Aplicativo que conecta usuários a pontos de coleta com recompensas.', 'Sustentabilidade'),
(2, 'Plataforma de Aulas Interativas', 'Ferramenta online para aulas com gamificação e quizzes.', 'Educação'),
(3, 'App de Saúde Mental', 'Aplicativo com meditação guiada e acompanhamento psicológico remoto.', 'Saúde'),
(1, 'Painel de Energia Solar Doméstico', 'Sistema para monitorar consumo e geração de energia solar em casa.', 'Energia'),
(4, 'Marketplace de Artesãos Locais', 'Plataforma que conecta artesãos a consumidores diretos.', 'Comércio');


INSERT INTO vote (customer_id, idea_id, value)
VALUES
(1, 2, 1),
(2, 1, 2),
(3, 1, 2), 
(3, 4, 1),
(4, 3, 1), 
(2, 3, 2),
(1, 3, 1);