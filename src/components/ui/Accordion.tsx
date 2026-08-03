/* ============================================================
   Accordion — accessible expand/collapse disclosure widget.
   ============================================================ */

import { memo, useId, useState } from 'react';
import { Icon } from '@/components/ui/Icon';

export interface AccordionItemData {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItemData[];
  /** Allows multiple panels open at once */
  allowMultiple?: boolean;
}

export const Accordion = memo(function Accordion({ items, allowMultiple = false }: AccordionProps) {
  const [openIds, setOpenIds] = useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenIds((current) => {
      if (allowMultiple) {
        return current.includes(id)
          ? current.filter((openId) => openId !== id)
          : [...current, id];
      }
      return current.includes(id) ? [] : [id];
    });
  };

  return (
    <div className="accordion">
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openIds.includes(item.id)}
          onToggle={() => toggle(item.id)}
        />
      ))}
    </div>
  );
});

interface AccordionItemProps {
  item: AccordionItemData;
  isOpen: boolean;
  onToggle: () => void;
}

const AccordionItem = memo(function AccordionItem({
  item,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  const buttonId = useId();
  const panelId = useId();

  return (
    <div className={`accordion__item ${isOpen ? 'accordion__item--open' : ''}`}>
      <h3 className="accordion__heading">
        <button
          id={buttonId}
          className="accordion__trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="accordion__question">{item.question}</span>
          <span className="accordion__icon" aria-hidden="true">
            <Icon name={isOpen ? 'minus' : 'plus'} size={18} />
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className="accordion__panel"
        hidden={!isOpen}
      >
        <div className="accordion__content">
          <p>{item.answer}</p>
        </div>
      </div>
    </div>
  );
});
