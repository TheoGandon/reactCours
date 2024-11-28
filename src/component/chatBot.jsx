import React, { useState, useEffect } from 'react';
import Markdown from 'react-markdown';
import TetrisLoader from './TetrisLoader/tetrisLoader';
import '../css/chatBot.css';

const ChatBot = () => {
    const [responseId, setResponseId] = useState('');
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [polling, setPolling] = useState(false);

    const workflowId = "76199b48-4931-4656-89fb-575d4575dd36"; 
    const authHeader = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiYzY3OWQzZTctOTcyZS00OWJiLWJlMmYtOWZlYzcwZjhiYjE1IiwidHlwZSI6ImFwaV90b2tlbiJ9.EurWk2a_DNP11h6th9uqcqTYdU9PjHEKuArGTlkdB2w"; // Remplacez par votre token

    const handleChatPrompt = async () => {
        const chat = document.querySelector('input[name="chat"]').value;
        setLoading(true);
        setError(null);
        setData(null);
        setPolling(false);

        try {
            const res = await fetch(`https://api.edenai.run/v2/workflow/${workflowId}/execution/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authHeader
                },
                body: JSON.stringify({ prompt: chat })
            });

            if (!res.ok) {
                throw new Error(`Erreur API: ${res.statusText}`);
            }

            const result = await res.json();
            setResponseId(result.id);
        } catch (error) {
            console.error('Erreur :', error.message);
            setError(`Une erreur est survenue: ${error.message}. Veuillez réessayer.`);
        } finally {
            setLoading(false);
        }
    };

    const getExecution = async (id) => {
        try {
            const res = await fetch(`https://api.edenai.run/v2/workflow/${workflowId}/execution/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": authHeader
                }
            });

            if (!res.ok) {
                throw new Error(`Erreur API: ${res.statusText}`);
            }

            const result = await res.json();
            return result;
        } catch (error) {
            console.error('Erreur :', error.message);
            setError(`Une erreur est survenue lors de la récupération des données: ${error.message}.`);
            return null;
        }
    };

    useEffect(() => {
        if (responseId) {
            let attempts = 0;
            const maxAttempts = 10;
            const delay = 1000;

            const fetchExecutionWithDelay = async () => {
                if (attempts >= maxAttempts) {
                    setError('Temps d’attente dépassé. Réessayez plus tard.');
                    setPolling(false);
                    return;
                }

                setPolling(true);
                const result = await getExecution(responseId);

                if (result && result.content && result.content.results) {
                    const lastNode = result.content.last_node_executed;
                    const generatedText = result.content.results[lastNode]?.results[0]?.generated_text;
                    if (generatedText) {
                        setData(generatedText);
                        setPolling(false);
                    } else {
                        attempts++;
                        setTimeout(fetchExecutionWithDelay, delay);
                    }
                } else {
                    attempts++;
                    setTimeout(fetchExecutionWithDelay, delay);
                }
            };

            fetchExecutionWithDelay();
        }
    }, [responseId]);

    return (
        <div className='chatContent'>
            <input className='chatInput' name="chat" type="text" placeholder="Entrez votre message" />
            <button className='Chatbutton' onClick={handleChatPrompt} disabled={loading || polling}>
                {loading || polling ? 'En cours...' : 'Envoyer'}
            </button>
            <div className='loader'>
            </div>    
            {loading && <p>Envoi en cours...</p>}
            {polling && <TetrisLoader />}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div>
                {data ? (
                    <Markdown>{data}</Markdown>
                ) : (
                    !loading && !polling && !error && <p>Aucune réponse pour l'instant.</p>
                )}
            </div>
        </div>
    );
};

export default ChatBot;
