import { NextResponse } from 'next/server';

export async function POST(req: Request) {
    try {
        const { message } = await req.json();

        // Here you'll integrate with your Python FastAPI backend
        // For now, return a mock response
        return NextResponse.json({
            id: Date.now().toString(),
            content: "I understand how you're feeling. Would you like to explore some coping strategies?",
            type: 'bot',
            timestamp: new Date(),
            suggestions: [
                "Tell me more about anxiety",
                "What are some coping techniques?",
                "Can you guide me through breathing?"
            ]
        });
    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json(
            { error: 'Failed to process message' },
            { status: 500 }
        );
    }
}