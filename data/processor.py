import csv
import json

viz_names = ['BLG', 'BGS', 'VAR', 'VTR', 'VID', 'VRC', 'GAB', 'DOB', 'KRZ',
        'KNL', 'LOV', 'MON', 'PAZ', 'PER', 'PVN', 'PDV', 'RAZ', 'RSE',
        'SLS', 'SLV', 'SML', 'SFO', 'SOF', 'SZR', 'TGV', 'HKV', 'SHU', 'JAM']

data_names = ['БЛАГОЕВГРАД', 'БУРГАС', 'ВАРНА', 'ВЕЛИКО ТЪРНОВО', 'ВИДИН',
        'ВРАЦА', 'ГАБРОВО', 'ДОБРИЧ', 'КЪРДЖАЛИ', 'КЮСТЕНДИЛ', 'ЛОВЕЧ',
        'МОНТАНА', 'ПАЗАРДЖИК', 'ПЕРНИК', 'ПЛЕВЕН', 'ПЛОВДИВ', 'РАЗГРАД',
        'РУСЕ', 'СИЛИСТРА', 'СЛИВЕН', 'СМОЛЯН', 'СОФИЙСКА', 'СОФИЯ',
        'СТАРА ЗАГОРА', 'ТЪРГОВИЩЕ', 'ХАСКОВО', 'ШУМЕН', 'ЯМБОЛ']

def skip_last(iterator):
    prev = next(iterator)
    for item in iterator:
        yield prev
        prev = item

def generate_car_deaths_by_area(filename='car_deaths.csv'):
    with open(filename) as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        car_deaths_by_area = {}

        for x in range(9):
            next(reader, None)

        for row in skip_last(reader):
            car_deaths_by_area[row[0]] = row[2]
    return car_deaths_by_area

def generate_general_deaths_by_area(filename='general_deaths.csv'):
    with open(filename) as csvfile:
        reader = csv.reader(csvfile, delimiter=',')
        general_deaths_by_area = {}

        for x in range(6):
            next(reader, None)

        for row in reader:
            key = row[0].upper()
            try:
                data_names.index(key)
            except ValueError:
                # This is an edge case, special map for Sofia province because
                # they're interchanged incorrectly
                if key == 'СОФИЯ (СТОЛИЦА)':
                    key = 'СОФИЯ'
                    general_deaths_by_area[key] = row[25]
            else:
                # We already encountered that area, skip it
                if key in general_deaths_by_area.keys():
                    # Re-map Sofia province correctly again
                    if key == 'СОФИЯ':
                        key = 'СОФИЙСКА'
                        general_deaths_by_area[key] = row[25]
                    else:
                        continue
                else:
                    general_deaths_by_area[key] = row[25]

    return general_deaths_by_area

def transform_keys(area_deaths_in):
    area_deaths_out = {}
    for key in area_deaths_in:
        data_names_index = data_names.index(key)
        area_deaths_out[viz_names[data_names_index]] = area_deaths_in[key]

    return area_deaths_out

car_deaths_by_area = generate_car_deaths_by_area()
general_deaths_by_area = generate_general_deaths_by_area()

car_deaths_transformed = transform_keys(car_deaths_by_area)
general_deaths_transformed = transform_keys(general_deaths_by_area)

car_deaths_json = json.dumps(car_deaths_transformed)
general_deaths_json = json.dumps(general_deaths_transformed)

car_deaths_file = open("car_deaths.json", "w")
car_deaths_file.write(car_deaths_json)
car_deaths_file.close()

general_deaths_file = open("general_deaths.json", "w")
general_deaths_file.write(general_deaths_json)
general_deaths_file.close()
