import React from "react";

const InteractiveUSMap = ({ selectedState, onStateClick }) => {
  return (
    <div className="bg-gray-50 rounded-lg p-6 mb-8">
      <div className="relative max-w-5xl mx-auto">
        {/* Interactive SVG US Map */}
        <svg
          viewBox="0 0 1200 720"
          className="w-full h-auto border border-gray-200 rounded-lg bg-white"
        >
          {/* Washington */}
          <path
            d="M190,60 L294,66 L295,90 L293,102 L287,114 L190,108 Z"
            fill={selectedState === 'WA' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('WA')}
          />
          <text x="234" y="90" className={`text-xs font-medium pointer-events-none ${selectedState === 'WA' ? 'fill-white' : 'fill-gray-800'}`}>WA</text>

          {/* Oregon */}
          <path
            d="M190,108 L287,114 L282,168 L190,162 Z"
            fill={selectedState === 'OR' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('OR')}
          />
          <text x="234" y="142" className={`text-xs font-medium pointer-events-none ${selectedState === 'OR' ? 'fill-white' : 'fill-gray-800'}`}>OR</text>

          {/* California */}
          <path
            d="M190,162 L282,168 L276,240 L258,300 L228,360 L198,396 L168,420 L156,384 L168,336 L180,288 L186,240 L190,192 Z"
            fill={selectedState === 'CA' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('CA')}
          />
          <text x="210" y="294" className={`text-xs font-medium pointer-events-none ${selectedState === 'CA' ? 'fill-white' : 'fill-gray-800'}`}>CA</text>

          {/* Nevada */}
          <path
            d="M282,168 L336,174 L330,288 L276,282 Z"
            fill={selectedState === 'NV' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('NV')}
          />
          <text x="302" y="230" className={`text-xs font-medium pointer-events-none ${selectedState === 'NV' ? 'fill-white' : 'fill-gray-800'}`}>NV</text>

          {/* Idaho */}
          <path
            d="M294,66 L348,72 L342,168 L336,174 L287,114 L295,90 Z"
            fill={selectedState === 'ID' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('ID')}
          />
          <text x="318" y="120" className={`text-xs font-medium pointer-events-none ${selectedState === 'ID' ? 'fill-white' : 'fill-gray-800'}`}>ID</text>

          {/* Montana */}
          <path
            d="M348,72 L564,60 L570,144 L342,168 Z"
            fill={selectedState === 'MT' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('MT')}
          />
          <text x="456" y="102" className={`text-xs font-medium pointer-events-none ${selectedState === 'MT' ? 'fill-white' : 'fill-gray-800'}`}>MT</text>

          {/* North Dakota */}
          <path
            d="M564,60 L696,54 L702,144 L570,144 Z"
            fill={selectedState === 'ND' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('ND')}
          />
          <text x="632" y="100" className={`text-xs font-medium pointer-events-none ${selectedState === 'ND' ? 'fill-white' : 'fill-gray-800'}`}>ND</text>

          {/* Minnesota */}
          <path
            d="M696,54 L780,48 L792,156 L756,162 L732,150 L702,144 Z"
            fill={selectedState === 'MN' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('MN')}
          />
          <text x="738" y="106" className={`text-xs font-medium pointer-events-none ${selectedState === 'MN' ? 'fill-white' : 'fill-gray-800'}`}>MN</text>

          {/* Wisconsin */}
          <path
            d="M756,162 L792,156 L804,228 L768,234 L732,150 Z"
            fill={selectedState === 'WI' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('WI')}
          />
          <text x="774" y="194" className={`text-xs font-medium pointer-events-none ${selectedState === 'WI' ? 'fill-white' : 'fill-gray-800'}`}>WI</text>

          {/* Michigan */}
          <path
            d="M792,156 L864,150 L876,216 L804,228 Z"
            fill={selectedState === 'MI' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('MI')}
          />
          <text x="834" y="186" className={`text-xs font-medium pointer-events-none ${selectedState === 'MI' ? 'fill-white' : 'fill-gray-800'}`}>MI</text>

          {/* Wyoming */}
          <path
            d="M342,168 L474,162 L468,252 L336,258 Z"
            fill={selectedState === 'WY' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('WY')}
          />
          <text x="404" y="212" className={`text-xs font-medium pointer-events-none ${selectedState === 'WY' ? 'fill-white' : 'fill-gray-800'}`}>WY</text>

          {/* Utah */}
          <path
            d="M336,258 L468,252 L462,342 L330,348 Z"
            fill={selectedState === 'UT' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('UT')}
          />
          <text x="398" y="302" className={`text-xs font-medium pointer-events-none ${selectedState === 'UT' ? 'fill-white' : 'fill-gray-800'}`}>UT</text>

          {/* Colorado */}
          <path
            d="M468,252 L600,246 L594,336 L462,342 Z"
            fill={selectedState === 'CO' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('CO')}
          />
          <text x="530" y="296" className={`text-xs font-medium pointer-events-none ${selectedState === 'CO' ? 'fill-white' : 'fill-gray-800'}`}>CO</text>

          {/* South Dakota */}
          <path
            d="M570,144 L702,144 L696,228 L564,234 Z"
            fill={selectedState === 'SD' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('SD')}
          />
          <text x="632" y="190" className={`text-xs font-medium pointer-events-none ${selectedState === 'SD' ? 'fill-white' : 'fill-gray-800'}`}>SD</text>

          {/* Iowa */}
          <path
            d="M696,228 L768,222 L762,288 L690,294 Z"
            fill={selectedState === 'IA' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('IA')}
          />
          <text x="728" y="260" className={`text-xs font-medium pointer-events-none ${selectedState === 'IA' ? 'fill-white' : 'fill-gray-800'}`}>IA</text>

          {/* Illinois */}
          <path
            d="M768,222 L804,228 L816,312 L762,318 L762,288 Z"
            fill={selectedState === 'IL' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('IL')}
          />
          <text x="786" y="272" className={`text-xs font-medium pointer-events-none ${selectedState === 'IL' ? 'fill-white' : 'fill-gray-800'}`}>IL</text>

          {/* Indiana */}
          <path
            d="M816,312 L864,306 L858,264 L876,216 L804,228 Z"
            fill={selectedState === 'IN' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('IN')}
          />
          <text x="836" y="272" className={`text-xs font-medium pointer-events-none ${selectedState === 'IN' ? 'fill-white' : 'fill-gray-800'}`}>IN</text>

          {/* Ohio */}
          <path
            d="M864,306 L936,300 L942,240 L876,216 Z"
            fill={selectedState === 'OH' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('OH')}
          />
          <text x="900" y="272" className={`text-xs font-medium pointer-events-none ${selectedState === 'OH' ? 'fill-white' : 'fill-gray-800'}`}>OH</text>

          {/* Nebraska */}
          <path
            d="M564,234 L696,228 L690,294 L558,300 Z"
            fill={selectedState === 'NE' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('NE')}
          />
          <text x="626" y="266" className={`text-xs font-medium pointer-events-none ${selectedState === 'NE' ? 'fill-white' : 'fill-gray-800'}`}>NE</text>

          {/* Kansas */}
          <path
            d="M558,300 L690,294 L684,384 L552,390 Z"
            fill={selectedState === 'KS' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('KS')}
          />
          <text x="620" y="344" className={`text-xs font-medium pointer-events-none ${selectedState === 'KS' ? 'fill-white' : 'fill-gray-800'}`}>KS</text>

          {/* Missouri */}
          <path
            d="M690,294 L762,288 L756,384 L684,384 Z"
            fill={selectedState === 'MO' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('MO')}
          />
          <text x="722" y="338" className={`text-xs font-medium pointer-events-none ${selectedState === 'MO' ? 'fill-white' : 'fill-gray-800'}`}>MO</text>

          {/* Arkansas */}
          <path
            d="M684,384 L756,384 L750,456 L678,462 Z"
            fill={selectedState === 'AR' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('AR')}
          />
          <text x="716" y="422" className={`text-xs font-medium pointer-events-none ${selectedState === 'AR' ? 'fill-white' : 'fill-gray-800'}`}>AR</text>

          {/* Oklahoma */}
          <path
            d="M552,390 L684,384 L678,462 L546,468 Z"
            fill={selectedState === 'OK' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('OK')}
          />
          <text x="614" y="428" className={`text-xs font-medium pointer-events-none ${selectedState === 'OK' ? 'fill-white' : 'fill-gray-800'}`}>OK</text>

          {/* New Mexico */}
          <path
            d="M462,342 L594,336 L588,468 L456,474 Z"
            fill={selectedState === 'NM' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('NM')}
          />
          <text x="524" y="404" className={`text-xs font-medium pointer-events-none ${selectedState === 'NM' ? 'fill-white' : 'fill-gray-800'}`}>NM</text>

          {/* Arizona */}
          <path
            d="M330,348 L462,342 L456,474 L324,480 Z"
            fill={selectedState === 'AZ' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('AZ')}
          />
          <text x="392" y="410" className={`text-xs font-medium pointer-events-none ${selectedState === 'AZ' ? 'fill-white' : 'fill-gray-800'}`}>AZ</text>

          {/* Texas */}
          <path
            d="M546,468 L678,462 L750,456 L756,540 L696,576 L624,588 L552,582 L480,564 L456,516 L456,474 L588,468 Z"
            fill={selectedState === 'TX' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('TX')}
          />
          <text x="608" y="524" className={`text-xs font-medium pointer-events-none ${selectedState === 'TX' ? 'fill-white' : 'fill-gray-800'}`}>TX</text>

          {/* Louisiana */}
          <path
            d="M678,462 L750,456 L756,540 L696,576 L624,588 L678,528 Z"
            fill={selectedState === 'LA' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('LA')}
          />
          <text x="710" y="522" className={`text-xs font-medium pointer-events-none ${selectedState === 'LA' ? 'fill-white' : 'fill-gray-800'}`}>LA</text>

          {/* Mississippi */}
          <path
            d="M750,456 L792,450 L798,540 L756,540 Z"
            fill={selectedState === 'MS' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('MS')}
          />
          <text x="776" y="494" className={`text-xs font-medium pointer-events-none ${selectedState === 'MS' ? 'fill-white' : 'fill-gray-800'}`}>MS</text>

          {/* Alabama */}
          <path
            d="M792,450 L840,444 L846,540 L798,540 Z"
            fill={selectedState === 'AL' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('AL')}
          />
          <text x="818" y="494" className={`text-xs font-medium pointer-events-none ${selectedState === 'AL' ? 'fill-white' : 'fill-gray-800'}`}>AL</text>

          {/* Tennessee */}
          <path
            d="M756,384 L864,378 L858,438 L750,456 Z"
            fill={selectedState === 'TN' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('TN')}
          />
          <text x="806" y="410" className={`text-xs font-medium pointer-events-none ${selectedState === 'TN' ? 'fill-white' : 'fill-gray-800'}`}>TN</text>

          {/* Kentucky */}
          <path
            d="M762,318 L864,312 L864,378 L756,384 Z"
            fill={selectedState === 'KY' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('KY')}
          />
          <text x="812" y="350" className={`text-xs font-medium pointer-events-none ${selectedState === 'KY' ? 'fill-white' : 'fill-gray-800'}`}>KY</text>

          {/* West Virginia */}
          <path
            d="M864,312 L936,300 L930,372 L864,378 Z"
            fill={selectedState === 'WV' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('WV')}
          />
          <text x="896" y="338" className={`text-xs font-medium pointer-events-none ${selectedState === 'WV' ? 'fill-white' : 'fill-gray-800'}`}>WV</text>

          {/* Virginia */}
          <path
            d="M864,378 L930,372 L924,432 L858,438 Z"
            fill={selectedState === 'VA' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('VA')}
          />
          <text x="896" y="404" className={`text-xs font-medium pointer-events-none ${selectedState === 'VA' ? 'fill-white' : 'fill-gray-800'}`}>VA</text>

          {/* North Carolina */}
          <path
            d="M858,438 L924,432 L948,468 L864,474 Z"
            fill={selectedState === 'NC' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('NC')}
          />
          <text x="902" y="458" className={`text-xs font-medium pointer-events-none ${selectedState === 'NC' ? 'fill-white' : 'fill-gray-800'}`}>NC</text>

          {/* South Carolina */}
          <path
            d="M864,474 L948,468 L942,516 L858,522 Z"
            fill={selectedState === 'SC' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('SC')}
          />
          <text x="902" y="500" className={`text-xs font-medium pointer-events-none ${selectedState === 'SC' ? 'fill-white' : 'fill-gray-800'}`}>SC</text>

          {/* Georgia */}
          <path
            d="M835,438 L865,432 L872,482 L865,530 L841,548 Z"
            fill={selectedState === 'GA' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('GA')}
          />
          <text x="853" y="490" className={`text-xs font-medium pointer-events-none ${selectedState === 'GA' ? 'fill-white' : 'fill-gray-800'}`}>GA</text>

          {/* Florida */}
          <path
            d="M846,540 L858,522 L942,516 L984,552 L972,600 L900,624 L864,600 L840,576 Z"
            fill={selectedState === 'FL' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('FL')}
          />
          <text x="908" y="570" className={`text-xs font-medium pointer-events-none ${selectedState === 'FL' ? 'fill-white' : 'fill-gray-800'}`}>FL</text>

          {/* Pennsylvania */}
          <path
            d="M936,300 L1008,294 L1002,354 L930,372 Z"
            fill={selectedState === 'PA' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('PA')}
          />
          <text x="968" y="332" className={`text-xs font-medium pointer-events-none ${selectedState === 'PA' ? 'fill-white' : 'fill-gray-800'}`}>PA</text>

          {/* Maryland */}
          <path
            d="M930,372 L1002,354 L1008,396 L924,432 Z"
            fill={selectedState === 'MD' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('MD')}
          />
          <text x="968" y="398" className={`text-xs font-medium pointer-events-none ${selectedState === 'MD' ? 'fill-white' : 'fill-gray-800'}`}>MD</text>

          {/* Delaware - Made larger */}
          <path
            d="M1008,396 L1032,390 L1038,444 L1008,450 Z"
            fill={selectedState === 'DE' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('DE')}
          />
          <text x="1022" y="426" className={`text-xs font-medium pointer-events-none ${selectedState === 'DE' ? 'fill-white' : 'fill-gray-800'}`}>DE</text>

          {/* New Jersey */}
          <path
            d="M1008,294 L1032,288 L1038,384 L1020,390 L1002,354 Z"
            fill={selectedState === 'NJ' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('NJ')}
          />
          <text x="1022" y="338" className={`text-xs font-medium pointer-events-none ${selectedState === 'NJ' ? 'fill-white' : 'fill-gray-800'}`}>NJ</text>

          {/* New York */}
          <path
            d="M942,240 L1044,234 L1050,288 L1032,288 L1008,294 Z"
            fill={selectedState === 'NY' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('NY')}
          />
          <text x="992" y="266" className={`text-xs font-medium pointer-events-none ${selectedState === 'NY' ? 'fill-white' : 'fill-gray-800'}`}>NY</text>

          {/* Connecticut - Made larger */}
          <path
            d="M1032,288 L1050,288 L1062,318 L1038,318 Z"
            fill={selectedState === 'CT' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('CT')}
          />
          <text x="1050" y="306" className={`text-xs font-medium pointer-events-none ${selectedState === 'CT' ? 'fill-white' : 'fill-gray-800'}`}>CT</text>

          {/* Rhode Island - Made larger */}
          <path
            d="M1050,288 L1068,282 L1074,306 L1056,318 Z"
            fill={selectedState === 'RI' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('RI')}
          />
          <text x="1062" y="302" className={`text-xs font-medium pointer-events-none ${selectedState === 'RI' ? 'fill-white' : 'fill-gray-800'}`}>RI</text>

          {/* Massachusetts */}
          <path
            d="M1044,234 L1104,228 L1110,282 L1062,282 L1050,288 Z"
            fill={selectedState === 'MA' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('MA')}
          />
          <text x="1076" y="260" className={`text-xs font-medium pointer-events-none ${selectedState === 'MA' ? 'fill-white' : 'fill-gray-800'}`}>MA</text>

          {/* Vermont */}
          <path
            d="M1044,234 L1068,228 L1074,180 L1050,186 Z"
            fill={selectedState === 'VT' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('VT')}
          />
          <text x="1058" y="210" className={`text-xs font-medium pointer-events-none ${selectedState === 'VT' ? 'fill-white' : 'fill-gray-800'}`}>VT</text>

          {/* New Hampshire */}
          <path
            d="M1068,228 L1104,228 L1110,180 L1074,180 Z"
            fill={selectedState === 'NH' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('NH')}
          />
          <text x="1088" y="210" className={`text-xs font-medium pointer-events-none ${selectedState === 'NH' ? 'fill-white' : 'fill-gray-800'}`}>NH</text>

          {/* Maine */}
          <path
            d="M1104,228 L1140,222 L1146,144 L1110,150 L1110,180 Z"
            fill={selectedState === 'ME' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('ME')}
          />
          <text x="1124" y="188" className={`text-xs font-medium pointer-events-none ${selectedState === 'ME' ? 'fill-white' : 'fill-gray-800'}`}>ME</text>

          {/* Alaska */}
          <path
            d="M120,540 L240,534 L264,576 L228,624 L144,630 L96,588 Z"
            fill={selectedState === 'AK' ? '#7c3aed' : '#c4b5fd'}
            stroke="#6b46c1"
            strokeWidth="1"
            className="cursor-pointer hover:fill-purple-600 transition-colors"
            onClick={() => onStateClick('AK')}
          />
          <text x="174" y="582" className={`text-xs font-medium pointer-events-none ${selectedState === 'AK' ? 'fill-white' : 'fill-gray-800'}`}>AK</text>

          {/* Hawaii */}
          <g>
            <circle cx="300" cy="600" r="10" fill={selectedState === 'HI' ? '#7c3aed' : '#c4b5fd'} stroke="#6b46c1" className="cursor-pointer hover:fill-purple-600" onClick={() => onStateClick('HI')} />
            <circle cx="324" cy="582" r="7" fill={selectedState === 'HI' ? '#7c3aed' : '#c4b5fd'} stroke="#6b46c1" className="cursor-pointer hover:fill-purple-600" onClick={() => onStateClick('HI')} />
            <circle cx="348" cy="570" r="6" fill={selectedState === 'HI' ? '#7c3aed' : '#c4b5fd'} stroke="#6b46c1" className="cursor-pointer hover:fill-purple-600" onClick={() => onStateClick('HI')} />
            <text x="300" y="636" className={`text-xs font-medium pointer-events-none ${selectedState === 'HI' ? 'fill-white' : 'fill-gray-800'}`}>HI</text>
          </g>

        </svg>
      </div>
    </div>
  );
};

export default InteractiveUSMap;