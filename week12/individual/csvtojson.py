import sys
import csv
import json

csvfile = open('birdstrikes03.csv', 'r')
jsonfile = open('birdstrike03.json', 'w')

reader = csv.reader(csvfile, delimiter=',')
next(reader)                # Skip csv header

jsonfile.write('[')         # Write bracket for start of list

# assume at least one row, strip out non utf-8 chars    
row = [str(column, errors='ignore') for column in next(reader)]

while True:
    birdstrike = {}
    birdstrike['Aircraft'] = {}
    birdstrike['Airport'] = {}
    birdstrike['Wildlife'] = {}
    birdstrike['Effect'] = {}
    birdstrike['Location'] = {}
    birdstrike['Conditions'] = {}
    birdstrike['Remains'] = {}
    birdstrike['When'] = {}
    birdstrike['Cost'] = {}

    birdstrike['Aircraft']['Type'] = row[0]
    birdstrike['Airport']['Name'] = row[1]
    birdstrike['Altitude'] = row[2]
    birdstrike['Aircraft']['Make'] = row[3]
    birdstrike['Wildlife']['Number'] = row[4]
    birdstrike['Effect']['Impact'] = row[5]
    birdstrike['Effect']['Other'] = row[6]
    birdstrike['Location']['Nearby'] = row[7]
    birdstrike['Aircraft']['FlightNumber'] = row[8]
    birdstrike['FlightDate'] = row[9]
    birdstrike['RecordId'] = row[10]
    birdstrike['Effect']['Damage'] = row[11]
    birdstrike['Location']['Freeform'] =row[12]
    birdstrike['Aircraft']['Enginines'] = row[13]
    birdstrike['Aircraft']['Airline'] = row[14]
    birdstrike['Origin'] = row[15]
    birdstrike['FlightPhase'] = row[16]
    birdstrike['Conditions']['Precipitation'] = row[17]
    birdstrike['Remains']['Collected'] = row[18]
    birdstrike['Remains']['Smithsonian'] = row[19]
    birdstrike['Remarks'] = row[20]
    birdstrike['ReportedDate'] = row[21]
    birdstrike['Wildlife']['Size'] = row[22]
    birdstrike['Conditions']['Sky'] = row[23]
    birdstrike['Wildlife']['Species'] = row[24]
    birdstrike['When']['Time'] = row[25]
    birdstrike['When']['TimeofDay'] = row[26]
    birdstrike['Warned'] = row[27]
    birdstrike['Cost']['TOS'] = row[28]
    birdstrike['Cost']['Other'] = row[29]
    birdstrike['Cost']['Repair'] = row[30]
    birdstrike['Cost']['Total'] = row[31]
    birdstrike['MilesFromAirport'] = row[32]
    birdstrike['FeetAboveGround'] = row[33]
    birdstrike['Fatalities'] = row[34]
    birdstrike['Injuries'] = row[35]
    birdstrike['Speed'] = row[36]

    json.dump(birdstrike, jsonfile)

    try:
        row = [bytes(column, errors='ignore') for column in next(reader)]
    except StopIteration:
        print("Conversion Finished")
        break

    jsonfile.write(',\n')   # commas between birdstrike objects

jsonfile.write(']')         # Write bracket for end of list