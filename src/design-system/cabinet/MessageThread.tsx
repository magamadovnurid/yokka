interface Message {
  id: string
  from: 'me' | 'other'
  text: string
  time: string
}

interface MessageThreadProps {
  messages: Message[]
}

export function MessageThread({ messages }: MessageThreadProps) {
  return (
    <section className="ds-chat" aria-label="История сообщений">
      {messages.map((message) => (
        <article key={message.id} className={`ds-chat__msg ds-chat__msg--${message.from}`}>
          <p className="ds-chat__bubble">{message.text}</p>
          <span className="ds-chat__time">{message.time}</span>
        </article>
      ))}
    </section>
  )
}
