import React from 'react';
import { StepTitle } from '@/ui/commen/title/SectionTitle';
import StatCard from '@/ui/events/StatCard';
import Card from '@/ui/commen/card/Card';
import InputSelect from '@/ui/commen/inputs/inputGroup/InputSelect';
import Button from '@/ui/commen/button/Button';
import DetailCard from '@/ui/events/DetailCard';

const scheduleOptions = [
  { value: 'now', label: 'أرسل الآن' },
  { value: 'later', label: 'جدولة لاحقاً' },
];

function Step5() {
  return (
    <div style={{ padding: '2.5rem 0' }}>
      <StepTitle
        title={'مراجعة واطلاق المناسبة'}
        description={'صمم الدعوة على كيفك'}
      />
      {/* Stats Row */}
      <div style={{ display: 'flex', gap: '1.5rem', margin: '2rem 0' }}>
        <DetailCard
          icon={'/svg/events/dashboard-icon.svg'}
          label={'نوع المناسبة'}
          value={'حفل زفاف'}
          sublabel={''}
        />
        <DetailCard
          icon={'/svg/events/calendar.svg'}
          label={'تاريخ المناسبة'}
          value={'25/12/2025'}
          sublabel={''}
        />
        <DetailCard
          icon={'/svg/events/people.svg'}
          label={'عدد المدعوين'}
          value={'250'}
          sublabel={''}
        />
        <DetailCard
          icon={'/svg/events/people.svg'}
          label={'عدد المشرفين'}
          value={'2'}
          sublabel={''}
        />
      </div>
      {/* Event Details Card */}
      <Card
        style={{
          marginBottom: '2rem',
          background: '#faf8f6',
          border: '1px solid #e9ecef',
        }}
      >
        <div style={{ padding: '1.5rem' }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: '16px',
              marginBottom: '0.5rem',
            }}
          >
            حفل زفاف أحمد و فاطمة
          </div>
          <div
            style={{ color: '#656565', fontSize: '14px', marginBottom: '1rem' }}
          >
            يسعدنا حضوركم ومشاركتكم فرحتنا في هذا اليوم المميز. <br />
            ندعوكم لحضور حفل الزفاف المقام يوم الجمعة 15 ديسمبر 2024 - 7:00
            مساءً
          </div>
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              alignItems: 'center',
              fontSize: '14px',
              color: '#2c2c2c',
            }}
          >
            <span>
              <img
                src="/svg/events/people.svg"
                alt="guests"
                style={{ width: 18, verticalAlign: 'middle', marginLeft: 4 }}
              />{' '}
              80 مدعو
            </span>
            <span>
              <img
                src="/svg/events/calendar.svg"
                alt="date"
                style={{ width: 18, verticalAlign: 'middle', marginLeft: 4 }}
              />{' '}
              الجمعة 15 ديسمبر 2024 - 7:00 مساءً
            </span>
            <span>
              <img
                src="/svg/events/location.svg"
                alt="location"
                style={{ width: 18, verticalAlign: 'middle', marginLeft: 4 }}
              />{' '}
              قاعة البرز للأفراح - الرياض
            </span>
            <span>
              <a
                href="https://www.goglemap.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#d38200', textDecoration: 'underline' }}
              >
                www.goglemap.com
              </a>
            </span>
          </div>
        </div>
      </Card>
      {/* Ready to Launch Section */}
      <div
        style={{
          background: '#eaf7ef',
          border: '1px solid #b6e2c6',
          borderRadius: 8,
          padding: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <div
          style={{
            color: '#1a7f3c',
            fontWeight: 700,
            fontSize: '18px',
            marginBottom: '0.5rem',
          }}
        >
          جاهز للإطلاق!
        </div>
        <div
          style={{ color: '#1a7f3c', fontSize: '15px', marginBottom: '1.2rem' }}
        >
          مناسبتك جاهزة للإطلاق. اختر كيف تريد إرسال الدعوات:
        </div>
        <div
          style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center',
            marginBottom: '1.2rem',
          }}
        >
          <InputSelect
            label={'جدولة الإرسال'}
            placeholder={'اختر موعد الإرسال'}
            name={'sendSchedule'}
            options={scheduleOptions}
          />
          <Button
            variant="secondary"
            title="نسخ رابط الدعوة"
            icon="/svg/events/copy.svg"
            onClick={() => {}}
          />
          <Button
            variant="secondary"
            title="مشاركة الدعوة"
            icon="/svg/events/share.svg"
            onClick={() => {}}
          />
        </div>
        <Button
          variant="primary"
          title="أؤكد على كل المعلومات وأطلق المناسبة"
          style={{ width: '100%', fontWeight: 700, fontSize: '1.1rem' }}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

export default Step5;
