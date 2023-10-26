const amqp = require('amqplib/callback_api');
const fs = require('fs');

// Connect to the message broker (RabbitMQ in this example)
amqp.connect('amqp://localhost', (error0, connection) => {
    if (error0) {
        throw error0;
    }

    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        const queue = 'form-widget-tasks';

        // Ensure the queue exists
        channel.assertQueue(queue, {
            durable: true,
        });

        console.log('Worker is waiting for messages...');

        // Consume messages from the queue
        channel.consume(queue, (msg) => {
            // Process the message (generate HTML file, etc.)
            const message = msg.content.toString();

            // Example: Create an HTML file with the message content
            fs.writeFile(`form-widget-${Date.now()}.html`, message, (err) => {
                if (err) throw err;
                console.log('HTML file generated');
            });

            // Acknowledge the message
            channel.ack(msg);
        });
    });
});