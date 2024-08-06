import React, { useEffect, useState } from 'react';
import { Worker } from '@/utils/types';
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from 'react-datepicker';
import { it } from 'date-fns/locale';

type Props = {
    activityTitle: string;
    activityValue: string;
    resetController: boolean;
    workers: Worker[];
    onDataChange: (activityValue: string, data: { activityExpire: Date, activityManager: string, activityNote: string }) => void;
}

const NewOrderActivity = ({ resetController, activityTitle, activityValue, workers, onDataChange }: Props) => {
    const [activityExpire, setActivityExpire] = useState<Date>(new Date());
    const [activityManager, setActivityManager] = useState<string>("");
    const [activityNote, setActivityNote] = useState<string>("");

    const handleExpireChange = (date: Date) => {
        setActivityExpire(date);
        onDataChange(activityValue, { activityExpire: date, activityManager, activityNote });
    };

    const handleManagerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const manager = event.target.value;
        setActivityManager(manager);
        onDataChange(activityValue, { activityExpire, activityManager: manager, activityNote });
    };

    const handleNoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const note = event.target.value;
        setActivityNote(note);
        onDataChange(activityValue, { activityExpire, activityManager, activityNote: note });
    };

    useEffect(() => {
        setActivityExpire(new Date())
        setActivityManager("")
        setActivityNote("")
    }, [resetController])


    return (
        <tr>
            <td className="md:text-xl">{activityTitle}</td>
            <td className='md:text-xl'>
                <ReactDatePicker
                    locale={it}
                    showTimeSelect
                    dateFormat='Pp'
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    className='cursor-pointer'
                    calendarClassName="custom-calendar"
                    minDate={new Date()}
                    selected={activityExpire}
                    onChange={handleExpireChange}
                />
            </td>
            <td>
                <select
                    value={activityManager}
                    onChange={handleManagerChange}
                    required
                    className="select select-xs md:select-md select-bordered"
                >
                    <option value="" disabled hidden>Seleziona responsabile</option>
                    {workers.map((worker: Worker) => (
                        <option key={worker.workerName} value={worker.workerName}>{worker.workerName}</option>
                    ))}
                </select>
            </td>
            <td>
                <input value={activityNote} onChange={handleNoteChange} type="text" placeholder="Nota" className="input input-bordered w-full max-w-xs" />
            </td>
        </tr>
    );
};

export default NewOrderActivity;
