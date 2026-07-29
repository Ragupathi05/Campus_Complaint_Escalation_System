import React, { useState, useEffect } from 'react';
import { locationApi } from '../api/locationApi';
import { MapPin, Info } from 'lucide-react';

export const LocationPicker = ({ onLocationSelect, onSelectLocation, selectedLocationId, selectedId }) => {
  const notifyParent = onLocationSelect || onSelectLocation || (() => {});

  const [roots, setRoots] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [floors, setFloors] = useState([]);
  const [rooms, setRooms] = useState([]);

  const [selectedCampus, setSelectedCampus] = useState('');
  const [selectedBlock, setSelectedBlock] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(selectedLocationId || selectedId || '');

  const [isCustomFloor, setIsCustomFloor] = useState(false);
  const [isCustomRoom, setIsCustomRoom] = useState(false);
  const [customLocationText, setCustomLocationText] = useState('');

  // Fetch Root Campus Nodes
  useEffect(() => {
    locationApi.getRoots().then((res) => {
      setRoots(res);
      if (res.length > 0) {
        setSelectedCampus(res[0].id);
        notifyParent(res[0].id);
      }
    }).catch(console.error);
  }, []);

  // Fetch Blocks when Campus changes
  useEffect(() => {
    if (selectedCampus) {
      locationApi.getChildren(selectedCampus).then((res) => {
        setBlocks(res);
        setFloors([]);
        setRooms([]);
        setSelectedBlock('');
        setSelectedFloor('');
        setSelectedRoom('');
        setIsCustomFloor(false);
        setIsCustomRoom(false);
        notifyParent(selectedCampus);
      }).catch(console.error);
    }
  }, [selectedCampus]);

  // Fetch Floors when Block changes
  useEffect(() => {
    if (selectedBlock) {
      locationApi.getChildren(selectedBlock).then((res) => {
        setFloors(res);
        setRooms([]);
        setSelectedFloor('');
        setSelectedRoom('');
        setIsCustomFloor(false);
        setIsCustomRoom(false);
        // Automatically select the Block ID so selection is valid even if no floor/room is picked
        notifyParent(selectedBlock);
      }).catch(console.error);
    }
  }, [selectedBlock]);

  // Fetch Rooms when Floor changes
  useEffect(() => {
    if (selectedFloor && selectedFloor !== 'CUSTOM_FLOOR') {
      locationApi.getChildren(selectedFloor).then((res) => {
        setRooms(res);
        setSelectedRoom('');
        setIsCustomRoom(false);
        notifyParent(selectedFloor);
      }).catch(console.error);
    }
  }, [selectedFloor]);

  const handleBlockChange = (e) => {
    const blockId = e.target.value;
    setSelectedBlock(blockId);
    if (blockId) {
      notifyParent(blockId);
    } else {
      notifyParent(selectedCampus);
    }
  };

  const handleFloorChange = (e) => {
    const val = e.target.value;
    if (val === 'CUSTOM_FLOOR') {
      setIsCustomFloor(true);
      setSelectedFloor('CUSTOM_FLOOR');
      notifyParent(selectedBlock);
    } else {
      setIsCustomFloor(false);
      setSelectedFloor(val);
      notifyParent(val || selectedBlock);
    }
  };

  const handleRoomChange = (e) => {
    const val = e.target.value;
    if (val === 'CUSTOM_ROOM') {
      setIsCustomRoom(true);
      setSelectedRoom('CUSTOM_ROOM');
      notifyParent(selectedFloor !== 'CUSTOM_FLOOR' ? selectedFloor : selectedBlock);
    } else {
      setIsCustomRoom(false);
      setSelectedRoom(val);
      notifyParent(val || selectedFloor || selectedBlock);
    }
  };

  return (
    <div className="space-y-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-indigo-600" />
          <span>Structured Campus Location Picker</span>
        </div>
        <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          Manual Entry Supported
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* 1. Campus */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">1. Campus</label>
          <select
            value={selectedCampus}
            onChange={(e) => setSelectedCampus(e.target.value)}
            className="w-full text-xs rounded-xl border-slate-300 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 p-2.5 bg-white border font-medium text-slate-800"
          >
            {roots.map((r) => (
              <option key={r.id} value={r.id}>{r.name}</option>
            ))}
          </select>
        </div>

        {/* 2. Academic / Hostel Block */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">2. Academic / Hostel Block</label>
          <select
            value={selectedBlock}
            onChange={handleBlockChange}
            disabled={!selectedCampus}
            className="w-full text-xs rounded-xl border-slate-300 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 p-2.5 bg-white border font-medium text-slate-800 disabled:bg-slate-100"
          >
            <option value="">-- Select Block --</option>
            {blocks.map((b) => (
              <option key={b.id} value={b.id}>{b.name}</option>
            ))}
          </select>
        </div>

        {/* 3. Floor */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">3. Floor</label>
          <select
            value={selectedFloor}
            onChange={handleFloorChange}
            disabled={!selectedBlock}
            className="w-full text-xs rounded-xl border-slate-300 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 p-2.5 bg-white border font-medium text-slate-800 disabled:bg-slate-100"
          >
            <option value="">{floors.length === 0 ? '-- No Predefined Floor (Optional) --' : '-- Select Floor --'}</option>
            {floors.map((f) => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
            <option value="CUSTOM_FLOOR">+ Type Custom Floor Manually</option>
          </select>
        </div>

        {/* 4. Room / Lab */}
        <div>
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">4. Room / Lab / Spot</label>
          <select
            value={selectedRoom}
            onChange={handleRoomChange}
            disabled={!selectedBlock}
            className="w-full text-xs rounded-xl border-slate-300 shadow-xs focus:border-indigo-500 focus:ring-indigo-500 p-2.5 bg-white border font-medium text-slate-800 disabled:bg-slate-100"
          >
            <option value="">{rooms.length === 0 ? '-- No Predefined Room (Optional) --' : '-- Select Room --'}</option>
            {rooms.map((rm) => (
              <option key={rm.id} value={rm.id}>{rm.name}</option>
            ))}
            <option value="CUSTOM_ROOM">+ Type Custom Room / Spot Manually</option>
          </select>
        </div>
      </div>

      {/* Helpful Hint banner */}
      <div className="p-2.5 bg-indigo-50/80 border border-indigo-100 rounded-xl flex items-start space-x-2 text-[11px] text-indigo-900">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
        <p>
          <span className="font-bold">Flexible Location Entry:</span> If your block, floor, or room is not listed above, simply select the building block and type your specific spot details in the <span className="font-semibold underline">Landmark / Specific Spot</span> box below (e.g. <em>"Mess Dining Hall"</em>, <em>"Room 304 West Wing"</em>, <em>"Near Water Cooler"</em>).
        </p>
      </div>
    </div>
  );
};
